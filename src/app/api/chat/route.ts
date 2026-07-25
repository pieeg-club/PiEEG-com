import { NextResponse } from "next/server";

const MAX_QUESTION_LENGTH = 1_000;
const REQUEST_TIMEOUT_MS = 30_000;

type AskResponse = {
  answer?: unknown;
  grounded?: unknown;
  sources?: unknown;
};

export async function POST(request: Request) {
  const apiUrl = process.env.PIEEG_AGENT_API_URL;
  const apiKey = process.env.PIEEG_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error("PiEEG chat API is not configured");
    return NextResponse.json(
      { error: "Chat is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question || question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: `Question must be between 1 and ${MAX_QUESTION_LENGTH} characters.` },
        { status: 400 },
      );
    }

    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ question }),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const data = (await response.json().catch(() => null)) as AskResponse | null;

    if (!response.ok || !data || typeof data.answer !== "string") {
      console.error("PiEEG chat API error", { status: response.status });
      return NextResponse.json(
        { error: "Buddy could not answer right now. Please try again." },
        { status: 502 },
      );
    }

    const sources = Array.isArray(data.sources)
      ? data.sources.filter(
          (source): source is { title: string; url: string } =>
            typeof source === "object" &&
            source !== null &&
            typeof source.title === "string" &&
            typeof source.url === "string" &&
            /^https?:\/\//.test(source.url),
        )
      : [];

    return NextResponse.json({
      answer: data.answer,
      grounded: data.grounded === true,
      sources,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error("PiEEG chat proxy error", timedOut ? "request timed out" : error);
    return NextResponse.json(
      { error: timedOut ? "Buddy took too long to respond. Please try again." : "Chat is temporarily unavailable." },
      { status: timedOut ? 504 : 500 },
    );
  }
}