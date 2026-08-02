---
title: "Build a Documentation RAG Discord Bot for Your Community"
date: "2026-08-02"
difficulty: "Intermediate"
time: "45 min"
excerpt: "Build PiEEG-bot from scratch — a Discord companion that answers hardware and software questions from your own docs using a lightweight retrieval-augmented pipeline. Clone the docs, chunk by heading, embed locally with fastembed (no API key), search with NumPy cosine similarity, and ground every answer in Claude Haiku with links back to the source pages."
image: "/news-images/discord-community.jpg"
featured: false
tags: ["Discord", "RAG", "Python", "LLM", "Claude", "fastembed", "FastAPI", "Bot"]
---

Community questions repeat themselves: *"What sample rate does the board use?"*, *"How do I attach the electrodes?"*, *"Which pin is the DRDY line?"* The answers already live in your documentation — they're just not where people are asking. **PiEEG-bot** closes that gap: a Discord bot that answers questions using **only** your existing docs, and always links back to the source page so nobody has to trust a hallucination.

This tutorial builds the whole thing: a **retrieval-augmented generation (RAG)** pipeline with no vector database, no paid embedding API, and a corpus small enough to live in a single JSON file. The exact architecture powers the real PiEEG-bot, and every piece here maps to a file you can read in the [PiEEG-bot repo](https://github.com/pieeg-club/PiEEG-bot).

## What you'll build

```
PiEEG-docs + PiEEG-com  ──git clone──▶  chunk by heading  ──embed──▶  data/index.json
                                                                            │
Discord / REST  ──ask──▶  cosine top-k  ──▶  one LLM call (grounded)  ─────┘
```

The key design choice: **the corpus is tiny** — a few dozen markdown files. That means no Pinecone, no Chroma, no pgvector. The entire index is one JSON file loaded into memory and searched with a single NumPy dot product. Embeddings run on-device via [fastembed](https://github.com/qdrant/fastembed) (ONNX on CPU — free, no key), and only the final grounded answer calls a remote LLM.

## Prerequisites

| What you need | Details |
|---|---|
| Python 3.10+ | The whole bot is a small Python package |
| `git` on your PATH | Ingestion clones your docs repos |
| An Anthropic API key | For the grounded chat answer (Claude Haiku) |
| A Discord account | To create the bot application and invite it |
| Your docs in Markdown | Any public repo of `.md` / `.mdx` files works |

> No embedding API key is ever required — embeddings are computed locally. The only paid call is the final answer generation.

## Step 1 — Project layout

Create a package with one module per responsibility. Keeping each stage isolated is what makes the pipeline easy to test without Discord.

```
pieeg_bot/
  config.py       # all tunables + which repos to index
  ingest.py       # clone → chunk → embed → index.json
  embeddings.py   # local fastembed wrapper
  retriever.py    # in-memory cosine search
  llm.py          # Anthropic chat client
  engine.py       # retrieve + generate (Discord-free)
  bot.py          # Discord client (slash + mention)
  api.py          # FastAPI POST /ask
  __main__.py     # CLI entrypoint
```

Set up `pyproject.toml` dependencies:

```toml
dependencies = [
    "discord.py>=2.3",
    "numpy>=1.24",
    "anthropic>=0.40",
    "fastembed>=0.3",
    "fastapi>=0.115",
    "uvicorn>=0.30",
]
```

## Step 2 — Declare your sources as data

Everything tunable lives in `config.py`, and your documentation sources are plain data so adding a repo is a one-line change. A `Source` describes a repo, where its markdown lives, and the public URL that folder maps to.

```python
@dataclass(frozen=True)
class Source:
    name: str          # shown in citations
    repo: str          # git URL to clone
    content_dir: str   # sub-directory holding the markdown
    url_base: str      # public URL that content_dir maps to

SOURCES = [
    Source(
        name="PiEEG Docs",
        repo="https://github.com/pieeg-club/PiEEG-docs.git",
        content_dir="pages",
        url_base="https://docs.pieeg.com",
    ),
    Source(
        name="PiEEG News",
        repo="https://github.com/pieeg-club/PiEEG-com.git",
        content_dir="content/news",
        url_base="https://pieeg.com/news",
    ),
]
```

The same file holds the retrieval knobs, read from environment variables with sane defaults:

```python
CHAT_MODEL = os.environ.get("PIEEG_CHAT_MODEL", "claude-haiku-4-5")
EMBED_MODEL = os.environ.get("PIEEG_EMBED_MODEL", "BAAI/bge-small-en-v1.5")
TOP_K       = int(os.environ.get("PIEEG_TOP_K", "5"))
MIN_SCORE   = float(os.environ.get("PIEEG_MIN_SCORE", "0.30"))
```

`TOP_K` is how many chunks each question retrieves; `MIN_SCORE` is the minimum cosine similarity for a chunk to count as relevant at all. Both matter — we'll tune them at the end.

## Step 3 — Ingest: clone, chunk, embed

Ingestion is a full rebuild every time. Because the corpus is small, there's no incremental indexing to get wrong — a rebuild takes seconds.

### Clone each repo

```python
def clone_or_update(source):
    name = source.repo.rstrip("/").split("/")[-1].removesuffix(".git")
    dest = config.CLONE_DIR / name
    if (dest / ".git").exists():
        _run_git(["fetch", "--depth", "1", "origin"], cwd=dest)
        _run_git(["reset", "--hard", "origin/HEAD"], cwd=dest)
    else:
        _run_git(["clone", "--depth", "1", source.repo, str(dest)])
    return dest
```

A shallow clone (`--depth 1`) is all we need — we only read the current files.

### Chunk by heading

The core idea: **a markdown heading is a natural retrieval unit**, and it gives us a deep link (`page#anchor`) straight back to the live docs. Walk each file, split on headings, and stamp every chunk with a breadcrumb so the embedding captures document context.

```python
def flush():
    text = "\n".join(cur_lines).strip()
    if not text:
        return
    url = f"{page_url}#{cur_anchor}" if cur_anchor else page_url
    # Prefix the breadcrumb so the embedding captures document context.
    body_text = f"# {doc_title} — {cur_heading}\n\n{text}"
    chunks.append(Chunk(text=body_text, url=url, source=source.name, title=cur_heading))
```

The anchor is generated GitHub-style (lowercase, punctuation stripped, spaces → `-`) so the deep link actually lands on the right section:

```python
def _slugify_anchor(heading):
    text = re.sub(r"[^\w\s-]", "", heading.strip().lower())
    return re.sub(r"\s+", "-", text).strip("-")
```

Frontmatter is stripped before chunking, and the document title is taken from the frontmatter `title:`, then the first H1, then the filename — in that order.

### Embed locally with fastembed

Anthropic has no embeddings endpoint, so we embed on-device. fastembed runs an ONNX model on CPU — free, keyless, and fast enough for a tiny corpus. Load it lazily and cache it so `--help` and unit tests don't pay the import cost.

```python
from functools import lru_cache

@lru_cache(maxsize=1)
def _model():
    from fastembed import TextEmbedding
    return TextEmbedding(model_name=config.EMBED_MODEL)

def embed_passages(texts):        # ingestion time
    return [vec.tolist() for vec in _model().embed(list(texts))]

def embed_query(text):            # query time
    return list(next(iter(_model().query_embed([text]))).tolist())
```

> Note the two functions. `bge`-style models expect a short instruction prefix on **queries only** — fastembed's `query_embed` adds it, which measurably improves retrieval. Use `embed_passages` for docs and `embed_query` for questions.

### Write the index

Serialize the chunks and their vectors into one file:

```python
payload = {
    "model": config.EMBED_MODEL,
    "chunks": [asdict(c) for c in chunks],
    "vectors": vectors,
}
config.INDEX_PATH.write_text(json.dumps(payload), encoding="utf-8")
```

That's the whole "database": `data/index.json`.

## Step 4 — Retrieve with NumPy

No vector store — load the matrix once, pre-normalise it, and retrieval becomes a plain dot product.

```python
class Retriever:
    def __init__(self, chunks, matrix):
        self._chunks = chunks
        norms = np.linalg.norm(matrix, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        self._matrix = matrix / norms  # pre-normalise → cosine == dot product

    async def search(self, query):
        vector = await asyncio.to_thread(embeddings.embed_query, query)
        q = np.asarray(vector, dtype=np.float32)
        scores = self._matrix @ (q / (np.linalg.norm(q) or 1.0))

        order = np.argsort(scores)[::-1][: config.TOP_K]
        results = []
        for idx in order:
            score = float(scores[idx])
            if score < config.MIN_SCORE:   # stop as soon as relevance drops
                break
            chunk = self._chunks[idx]
            results.append(Retrieved(**chunk, score=score))
        return results
```

Two details worth calling out: embedding the query is CPU-bound, so it runs off the event loop with `asyncio.to_thread`; and the `MIN_SCORE` cutoff is what lets the bot honestly say *"I don't know"* instead of stuffing irrelevant chunks into the prompt.

## Step 5 — Ground the answer in the LLM

The remote call is deliberately boring: one message, low temperature, a strict system prompt.

```python
SYSTEM_PROMPT = (
    "You are PiEEG-bot, the documentation companion for the PiEEG "
    "brain-computer-interface community. Answer the user's question using ONLY "
    "the documentation excerpts provided in CONTEXT. Be concise, friendly and "
    "practical. If the context does not contain the answer, say so plainly and "
    "suggest rephrasing or asking the team — do not invent details, part "
    "numbers, pin-outs or API names. Do not add source links yourself; they "
    "are appended automatically."
)

async def chat(client, system, user):
    message = await client.messages.create(
        model=config.CHAT_MODEL,
        max_tokens=config.MAX_TOKENS,
        temperature=0.2,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return "".join(
        b.text for b in message.content if getattr(b, "type", None) == "text"
    ).strip()
```

The `ONLY ... CONTEXT` instruction plus `temperature=0.2` is what keeps the bot factual. It is grounded because we control the context, not because the model promises to behave.

## Step 6 — Wire it together in an engine

The `Engine` is intentionally Discord-free so you can drive the full pipeline from a REPL, a test, or a REST call. It retrieves, bails early if nothing is relevant, then builds the context and asks the LLM.

```python
async def answer(self, question):
    question = question.strip()
    results = await self._retriever.search(question)
    if not results:
        return Answer(
            "I couldn't find that in the PiEEG documentation. "
            "Try rephrasing your question or ask the team here for help."
        )
    context = _build_context(results)          # numbered [1] Source: ... blocks
    user = f"CONTEXT:\n{context}\n\nQUESTION: {question}"
    reply = await llm.chat(self._anthropic, SYSTEM_PROMPT, user)
    return Answer(reply, results)
```

The returned `Answer` carries the retrieved chunks alongside the text, so any front-end can render de-duplicated source links and know whether the reply was `grounded`.

## Step 7 — The Discord client

Two ways to ask: a discoverable `/ask` slash command, and an `@mention` trigger in any channel the bot can read. Both funnel into the same `engine.answer`.

```python
class PiEEGBot(discord.Client):
    def __init__(self, engine):
        intents = discord.Intents.default()
        intents.message_content = True   # required for the @mention trigger
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)
        self._engine = engine

    async def setup_hook(self):
        await self._engine.warm()   # load embedding model up front
        await self.tree.sync()      # register slash commands

    async def on_message(self, message):
        if message.author.bot or self.user not in message.mentions:
            return
        question = message.clean_content.replace(f"@{self.user.display_name}", "")
        async with message.channel.typing():
            reply = (await self._engine.answer(question)).to_discord()
        await message.reply(reply, mention_author=False)
```

`Answer.to_discord()` appends the **Sources** list and truncates cleanly under Discord's 2000-character message limit.

## Step 8 — Connect it to Discord

A one-time setup to create the bot account and invite it.

### Create the application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**. Name it `PiEEG-bot`.
2. Open the **Bot** tab → **Add Bot**.
3. Under **Privileged Gateway Intents**, enable **Message Content Intent**. This is required for the `@mention` trigger; without it only `/ask` works.
4. Click **Reset Token**, copy it into your `.env` as `DISCORD_TOKEN`. Treat it like a password — never commit it.

### Invite it to your server

1. Open **OAuth2 → URL Generator**.
2. Under **Scopes**, tick `bot` and `applications.commands`.
3. Under **Bot Permissions**, tick **Send Messages**, **Read Message History**, and **Use Slash Commands**.
4. Open the generated URL, pick your server, and **Authorize** (you need *Manage Server* permission).

## Step 9 — Build the index and run

```bash
pip install .
cp .env.example .env        # fill in ANTHROPIC_API_KEY and DISCORD_TOKEN

# 1. Build the index — clones the repos, embeds locally. No API key needed.
pieeg-bot ingest

# 2. Try it with no Discord required — same pipeline the bot uses.
pieeg-bot ask "How do I attach the electrodes?"
pieeg-bot ask "..." --scores        # also print retrieval scores
pieeg-bot chat                       # interactive REPL

# 3. Go live on Discord.
pieeg-bot run
```

The `ask` and `chat` commands exercise the **exact** retrieval + prompt pipeline the Discord bot uses, so they're the fastest way to sanity-check the index and demo answers without a token.

## Step 10 — (Optional) Expose a REST endpoint

The same engine can serve a `POST /ask` route via FastAPI, sharing one in-memory index and one embedding model with the Discord client in a single process.

```bash
curl -X POST http://localhost:8080/ask \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-long-random-secret" \
  -d '{"question":"How do I attach the electrodes?"}'
```

```json
{
  "answer": "...",
  "grounded": true,
  "sources": [{"title": "...", "url": "https://docs.pieeg.com/..."}]
}
```

Guard it with a `PIEEG_API_KEY` checked in the `X-API-Key` header, keep that key server-side, and don't enable browser CORS — the endpoint is for server-to-server calls, not frontend JavaScript.

## Tuning retrieval

Two knobs decide answer quality. Use `pieeg-bot ask "..." --scores` to see the raw cosine scores and adjust:

| Symptom | Fix |
|---|---|
| Bot says "I don't know" too often | Lower `PIEEG_MIN_SCORE` (e.g. `0.25`) |
| Answers pull in off-topic chunks | Raise `PIEEG_MIN_SCORE` (e.g. `0.40`) |
| Answers miss context from nearby sections | Raise `PIEEG_TOP_K` (e.g. `7`) |
| Prompt is too long / slow / expensive | Lower `PIEEG_TOP_K` |

For `bge-small`, relevant passages typically score `~0.6+`, so the default `0.30` floor is deliberately generous. Retune it against **your** docs.

## Keeping the index fresh

Docs change. Run `pieeg-bot ingest` on a schedule (a nightly GitHub Action works well): it rebuilds `data/index.json`, commits it when it changes, and can redeploy. Because ingestion embeds locally, **no API key secret is needed** in CI — only a deploy token if you auto-redeploy.

## Why this architecture holds up

- **No vector DB** — one JSON file, one NumPy dot product. Deployment is "copy a file."
- **Keyless embeddings** — fastembed on CPU means ingestion needs zero credentials and costs nothing.
- **Grounded by construction** — the model only ever sees retrieved excerpts, and every answer ends with links back to the real page.
- **Honest failure** — the `MIN_SCORE` cutoff lets the bot admit it doesn't know instead of guessing.
- **One engine, many front-ends** — Discord, a REPL, and a REST API all share the same retrieval and grounding path.

Adding another documentation repo is a single entry in `SOURCES`. Point it at your own docs, and you have a community bot that only ever speaks from the source of truth.
