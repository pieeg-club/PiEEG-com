"use client";

import {
  ArrowUp,
  Bot,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const STORAGE_KEY = "pieeg-buddy-messages";
const STARTER_QUESTIONS = [
  "How do I attach the electrodes?",
  "Which PiEEG board is right for me?",
  "How can I improve signal quality?",
];

type Source = {
  title: string;
  url: string;
};

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: Source[];
  error?: boolean;
};

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I’m **Buddy**, the PiEEG assistant. Ask me about hardware, electrode setup, signal quality, software, or getting started.",
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const conversationRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const storedMessages = sessionStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages) as unknown;
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed as Message[]);
        }
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }

  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const conversation = conversationRef.current;
    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [isOpen, isLoading, messages]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  const submitQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const data = (await response.json().catch(() => null)) as
        | { answer?: string; sources?: Source[]; error?: string }
        | null;

      if (!response.ok || !data?.answer) {
        throw new Error(data?.error || "Buddy could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: data.answer as string,
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: error instanceof Error ? error.message : "Chat is temporarily unavailable.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(input);
  };

  const resetConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    inputRef.current?.focus();
  };

  return isOpen ? (
    <section
      role="dialog"
      aria-label="Chat with Buddy, the PiEEG assistant"
      aria-live="polite"
      className="fixed bottom-2 left-2 z-70 flex h-[min(620px,calc(100dvh-1rem))] w-[calc(100vw-1rem)] flex-col overflow-hidden border border-zinc-200/90 bg-white shadow-2xl shadow-zinc-950/20 dark:border-zinc-700/90 dark:bg-zinc-950 dark:shadow-black/50 sm:bottom-6 sm:left-auto sm:right-6 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-lg"
    >
          <div className="relative flex min-h-16 shrink-0 items-center gap-3 border-b border-teal-950/15 bg-teal-700 px-4 text-white">
            <div className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Bot className="size-5" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-teal-700 bg-emerald-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-[family-name:var(--font-tech)] text-sm font-semibold">Buddy</h2>
                <span className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-50">
                  PiEEG AI
                </span>
              </div>
              <p className="text-xs text-teal-50/80">Product and setup guidance</p>
            </div>
            <button
              type="button"
              onClick={resetConversation}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Start a new conversation"
              title="New conversation"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close chat"
              title="Close chat"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={conversationRef}
            className="min-h-0 flex-1 overscroll-contain overflow-y-auto bg-zinc-50 px-4 py-5 dark:bg-zinc-900/70"
            aria-label="Conversation"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[88%] ${message.role === "user" ? "order-2" : ""}`}>
                    <div
                      className={`px-3.5 py-2.5 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-lg rounded-br-sm bg-teal-700 text-white"
                          : message.error
                            ? "rounded-lg rounded-bl-sm border border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
                            : "rounded-lg rounded-bl-sm border border-zinc-200 bg-white text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 list-disc pl-4 last:mb-0">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-2 list-decimal pl-4 last:mb-0">{children}</ol>,
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline decoration-current/40 underline-offset-2 hover:decoration-current"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Sources">
                        {message.sources.map((source) => (
                          <a
                            key={`${message.id}-${source.url}`}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-full items-center gap-1 rounded-sm border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:border-teal-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-teal-700 dark:hover:text-teal-300"
                          >
                            <span className="truncate">{source.title}</span>
                            <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-lg rounded-bl-sm border border-zinc-200 bg-white px-3.5 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                    <span className="size-1.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-teal-600" />
                    <span className="sr-only">Buddy is thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {messages.length === 1 && (
            <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void submitQuestion(question)}
                  className="shrink-0 cursor-pointer rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-left text-xs font-medium text-zinc-700 transition-colors hover:border-teal-400 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-teal-600 dark:hover:text-teal-300"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex min-h-11 items-end gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-1.5 pl-3 transition-colors focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/15 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-teal-500">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 1000))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                maxLength={1000}
                placeholder="Ask Buddy a question..."
                aria-label="Message Buddy"
                className="max-h-24 min-h-8 flex-1 resize-none bg-transparent py-1 text-sm leading-6 text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md bg-teal-700 text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
                aria-label="Send message"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
              <Sparkles className="size-3" aria-hidden="true" />
              AI can make mistakes. Verify critical setup guidance.
            </p>
          </form>
    </section>
  ) : (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 z-70 flex h-14 cursor-pointer items-center gap-3 rounded-full bg-teal-700 px-4 text-white shadow-xl shadow-teal-950/25 transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 sm:bottom-6 sm:right-6"
      aria-label="Open PiEEG assistant"
    >
          <span className="relative grid size-8 place-items-center rounded-full bg-white/15">
            <MessageCircle className="size-5" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-teal-700 bg-emerald-300" />
          </span>
          <span className="pr-1 text-left">
            <span className="block font-[family-name:var(--font-tech)] text-sm font-semibold leading-4">Ask Buddy</span>
            <span className="block text-[10px] text-teal-50/75">PiEEG assistant</span>
          </span>
    </button>
  );
}