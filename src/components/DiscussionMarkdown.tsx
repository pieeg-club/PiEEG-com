"use client";

import { useState, useRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bold,
  Italic,
  Code,
  FileCode,
  Link as LinkIcon,
  List,
  Check,
  Copy,
  Eye,
  Edit3,
} from "lucide-react";

function isSafeHref(href?: string): boolean {
  if (!href) return false;
  const trimmed = href.trim().toLowerCase();
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#")
  );
}

function CodeBlock({
  language,
  children,
}: {
  language?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(children).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    }
  };

  return (
    <div className="group relative my-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-zinc-800 bg-zinc-900/90 text-[11px] font-mono text-zinc-400">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/**
 * Safe Markdown renderer for Community Discussions.
 * Intentionally omits rehype-raw so raw HTML is never interpreted as DOM.
 */
export function DiscussionMarkdown({
  content,
  compact = false,
}: {
  content: string;
  compact?: boolean;
}) {
  const components: Components = {
    h1: ({ children }) => (
      <h2 className="text-xl font-bold mt-5 mb-2.5 text-zinc-900 dark:text-zinc-100">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-zinc-100">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-base font-semibold mt-3.5 mb-1.5 text-zinc-900 dark:text-zinc-100">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p
        className={`${
          compact ? "mb-2.5 text-sm leading-6" : "mb-3.5 text-[15px] leading-7"
        } text-zinc-700 dark:text-zinc-300 last:mb-0 wrap-break-word`}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-3.5 space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[15px] leading-7">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-3.5 space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[15px] leading-7">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => {
      if (!isSafeHref(href)) {
        return <span className="text-zinc-600 dark:text-zinc-400">{children}</span>;
      }
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer nofollow" : undefined}
          className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline underline-offset-2 font-medium break-all"
        >
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-cyan-500 pl-3.5 py-1 my-3 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 rounded-r-lg">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      const rawText = String(children).replace(/\n$/, "");
      const langMatch = /language-([\w-]+)/.exec(className || "");
      const isBlock = Boolean(langMatch) || String(children).includes("\n");

      if (isBlock) {
        return <CodeBlock language={langMatch?.[1]}>{rawText}</CodeBlock>;
      }
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-cyan-700 dark:text-cyan-300 text-[13px] font-mono border border-zinc-200/70 dark:border-zinc-700/70">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-50 dark:bg-zinc-900">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {children}
      </tbody>
    ),
    th: ({ children }) => (
      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{children}</td>
    ),
    hr: () => <hr className="my-5 border-zinc-200 dark:border-zinc-800" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </strong>
    ),
  };

  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

interface MarkdownEditorProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  id?: string;
  minLength?: number;
}

export function DiscussionMarkdownEditor({
  value,
  onChange,
  placeholder = "Share details, setup info, or code snippets (Markdown supported)...",
  rows = 6,
  disabled = false,
  id,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix = "", sample = "text") => {
    const el = textareaRef.current;
    if (!el) {
      onChange(`${value}${prefix}${sample}${suffix}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || sample;
    const next =
      value.slice(0, start) + prefix + selected + suffix + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = cursorStart + selected.length;
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden focus-within:border-cyan-500 dark:focus-within:border-cyan-500 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              tab === "write"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs border border-zinc-200/80 dark:border-zinc-700"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              tab === "preview"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs border border-zinc-200/80 dark:border-zinc-700"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>

        {tab === "write" && (
          <div className="flex items-center gap-0.5 text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              title="Bold"
              disabled={disabled}
              onClick={() => insertFormatting("**", "**", "bold")}
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Italic"
              disabled={disabled}
              onClick={() => insertFormatting("*", "*", "italic")}
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Inline code"
              disabled={disabled}
              onClick={() => insertFormatting("`", "`", "CHnSET = 0x01")}
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Code block"
              disabled={disabled}
              onClick={() =>
                insertFormatting("\n```python\n", "\n```\n", "# code here")
              }
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Link"
              disabled={disabled}
              onClick={() => insertFormatting("[", "](https://)", "link text")}
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Bullet list"
              disabled={disabled}
              onClick={() => insertFormatting("\n- ", "", "item")}
              className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {tab === "write" ? (
        <textarea
          ref={textareaRef}
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3.5 py-3 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none resize-y font-sans leading-relaxed"
        />
      ) : (
        <div className="px-4 py-3.5 min-h-32 bg-white dark:bg-zinc-950">
          {value.trim() ? (
            <DiscussionMarkdown content={value} />
          ) : (
            <p className="text-sm italic text-zinc-400 dark:text-zinc-500">
              Nothing to preview yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
