"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  MessageSquarePlus,
  Search,
  Flame,
  TrendingUp,
  Clock,
  HelpCircle,
  Pin,
  Lock,
  Eye,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bot,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import {
  DISCUSSIONS_API_URL,
  DISCUSSION_CATEGORIES,
  SUGGESTED_TAGS,
  formatRelativeTime,
  getCategoryMeta,
  parseApiError,
  type CreateThreadPayload,
  type CreateThreadResponse,
  type DiscussionCategory,
  type DiscussionSort,
  type DiscussionThread,
  type DiscussionsListResponse,
  type VoteResponse,
} from "@/lib/discussions";
import {
  AuthStatusChip,
  AuthorIdentity,
  DiscussionAuthModal,
  ModerationHoldNotice,
  SolvedBadge,
  ToastNotification,
  VoteControl,
  useDiscussionsAuth,
  useToast,
} from "./DiscussionShared";
import { DiscussionComposerModal } from "./DiscussionComposerModal";

interface DiscussionsListClientProps {
  initialData: DiscussionsListResponse | null;
  initialFilters: {
    category: string;
    tag: string;
    search: string;
    sort: string;
    page: number;
  };
}

const SORT_OPTIONS: {
  id: DiscussionSort;
  label: string;
  Icon: typeof Flame;
}[] = [
  { id: "active", label: "Active", Icon: Flame },
  { id: "top", label: "Top", Icon: TrendingUp },
  { id: "latest", label: "Latest", Icon: Clock },
  { id: "unanswered", label: "Unanswered", Icon: HelpCircle },
];

function isValidCategory(val: string): val is DiscussionCategory {
  return DISCUSSION_CATEGORIES.some((c) => c.id === val);
}

function isValidSort(val: string): val is DiscussionSort {
  return SORT_OPTIONS.some((s) => s.id === val);
}

export default function DiscussionsListClient({
  initialData,
  initialFilters,
}: DiscussionsListClientProps) {
  const router = useRouter();
  const {
    token,
    userEmail,
    currentUser,
    authReady,
    authPrompt,
    requestAuth,
    closeAuthPrompt,
    saveSession,
    signOut,
    fetchWithAuth,
  } = useDiscussionsAuth();
  const { toast, showToast, dismissToast } = useToast();

  const [category, setCategory] = useState<DiscussionCategory | "all">(
    isValidCategory(initialFilters.category) ? initialFilters.category : "all"
  );
  const [sort, setSort] = useState<DiscussionSort>(
    isValidSort(initialFilters.sort) ? initialFilters.sort : "active"
  );
  const [tag, setTag] = useState<string>(initialFilters.tag || "");
  const [searchInput, setSearchInput] = useState<string>(
    initialFilters.search || ""
  );
  const [debouncedSearch, setDebouncedSearch] = useState<string>(
    initialFilters.search || ""
  );
  const [page, setPage] = useState<number>(initialFilters.page || 1);

  const [threads, setThreads] = useState<DiscussionThread[]>(
    initialData?.results ?? []
  );
  const [total, setTotal] = useState<number>(initialData?.total ?? 0);
  const [totalPages, setTotalPages] = useState<number>(
    initialData?.totalPages ?? 1
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [composerOpen, setComposerOpen] = useState(false);
  const [composerSubmitting, setComposerSubmitting] = useState(false);
  const [composerError, setComposerError] = useState<string | null>(null);
  const [moderationNotice, setModerationNotice] = useState<string | null>(null);
  const [votingIds, setVotingIds] = useState<Set<string>>(new Set());

  const isFirstRenderRef = useRef(true);

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchInput.trim();
      setDebouncedSearch((prev) => {
        if (prev !== trimmed) setPage(1);
        return trimmed;
      });
    }, 320);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync URL query params for shareable filters
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    const qs = new URLSearchParams();
    if (category !== "all") qs.set("category", category);
    if (tag) qs.set("tag", tag);
    if (debouncedSearch) qs.set("search", debouncedSearch);
    if (sort !== "active") qs.set("sort", sort);
    if (page > 1) qs.set("page", String(page));
    const queryStr = qs.toString();
    router.replace(
      queryStr
        ? `/community/discussions?${queryStr}`
        : "/community/discussions",
      { scroll: false }
    );
  }, [category, tag, debouncedSearch, sort, page, router]);

  const fetchThreadsPage = useCallback(
    async (
      overrideBearer?: string,
      signal?: AbortSignal
    ): Promise<DiscussionsListResponse> => {
      const qs = new URLSearchParams();
      if (category !== "all") qs.set("category", category);
      if (tag) qs.set("tag", tag);
      if (debouncedSearch) qs.set("search", debouncedSearch);
      qs.set("sort", sort);
      qs.set("page", String(page));
      qs.set("limit", "20");

      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}?${qs.toString()}`,
        { method: "GET", signal },
        { overrideToken: overrideBearer }
      );
      if (!res.ok) {
        throw await parseApiError(res);
      }
      return (await res.json()) as DiscussionsListResponse;
    },
    [category, tag, debouncedSearch, sort, page, fetchWithAuth]
  );

  const reloadThreadsManually = useCallback(
    async (overrideBearer?: string) => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchThreadsPage(overrideBearer);
        setThreads(Array.isArray(data.results) ? data.results : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setTotalPages(
          typeof data.totalPages === "number" ? Math.max(1, data.totalPages) : 1
        );
      } catch (err) {
        setFetchError(
          err instanceof Error
            ? err.message
            : "Could not load discussions right now."
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchThreadsPage]
  );

  // Fetch when filters change or once client auth state resolves (so myVote is populated)
  useEffect(() => {
    if (!authReady) return;
    const controller = new AbortController();
    const syncThreads = async () => {
      try {
        const data = await fetchThreadsPage(undefined, controller.signal);
        if (controller.signal.aborted) return;
        setFetchError(null);
        setThreads(Array.isArray(data.results) ? data.results : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setTotalPages(
          typeof data.totalPages === "number" ? Math.max(1, data.totalPages) : 1
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        setFetchError(
          err instanceof Error
            ? err.message
            : "Could not load discussions right now."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    void syncThreads();
    return () => controller.abort();
  }, [authReady, token, fetchThreadsPage]);

  const handleOpenNewThread = () => {
    setComposerError(null);
    if (!token) {
      requestAuth("Verify email to start a discussion", () => {
        setComposerOpen(true);
      });
      return;
    }
    setComposerOpen(true);
  };

  const handleCreateThread = async (payload: CreateThreadPayload) => {
    setComposerSubmitting(true);
    setComposerError(null);
    try {
      const res = await fetchWithAuth(
        DISCUSSIONS_API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        { requireAuth: true }
      );

      if (res.status === 401) {
        setComposerSubmitting(false);
        requestAuth("Session expired — verify email to publish", (newToken) => {
          void submitWithFreshToken(payload, newToken);
        });
        return;
      }

      if (!res.ok) {
        throw await parseApiError(res);
      }

      const created = (await res.json()) as CreateThreadResponse;
      setComposerOpen(false);

      if (created.moderationHold) {
        try {
          sessionStorage.setItem(
            `pieeg-mod-hold-${created.thread.id}`,
            created.message ||
              "Your post is queued for moderator review and is currently visible to you."
          );
        } catch {
          // ignore
        }
        setModerationNotice(
          created.message ||
            "Your discussion is queued for moderator approval."
        );
      } else {
        showToast("Discussion published!", "success");
      }

      router.push(`/community/discussions/${created.thread.id}`);
    } catch (err) {
      setComposerError(
        err instanceof Error ? err.message : "Failed to publish thread."
      );
    } finally {
      setComposerSubmitting(false);
    }
  };

  const submitWithFreshToken = async (
    payload: CreateThreadPayload,
    freshToken: string
  ) => {
    setComposerSubmitting(true);
    setComposerError(null);
    try {
      const res = await fetchWithAuth(
        DISCUSSIONS_API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        { requireAuth: true, overrideToken: freshToken }
      );
      if (!res.ok) throw await parseApiError(res);
      const created = (await res.json()) as CreateThreadResponse;
      setComposerOpen(false);
      if (created.moderationHold) {
        try {
          sessionStorage.setItem(
            `pieeg-mod-hold-${created.thread.id}`,
            created.message
          );
        } catch {
          // ignore
        }
      }
      router.push(`/community/discussions/${created.thread.id}`);
    } catch (err) {
      setComposerError(
        err instanceof Error ? err.message : "Failed to publish thread."
      );
    } finally {
      setComposerSubmitting(false);
    }
  };

  const performThreadVote = async (
    thread: DiscussionThread,
    value: 1 | -1 | 0,
    overrideBearer?: string
  ) => {
    if (votingIds.has(thread.id)) return;

    const prevVote = thread.myVote;
    const prevScore = thread.score;
    const prevUpvotes = thread.upvotes;
    const prevDownvotes = thread.downvotes;

    const nextVote: 1 | -1 | 0 = prevVote === value ? 0 : value;
    const scoreDelta = nextVote - prevVote;

    setVotingIds((prev) => new Set(prev).add(thread.id));
    setThreads((prev) =>
      prev.map((t) =>
        t.id === thread.id
          ? { ...t, myVote: nextVote, score: t.score + scoreDelta }
          : t
      )
    );

    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(thread.id)}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        },
        { requireAuth: true, overrideToken: overrideBearer }
      );

      if (res.status === 401) {
        setThreads((prev) =>
          prev.map((t) =>
            t.id === thread.id
              ? {
                  ...t,
                  myVote: prevVote,
                  score: prevScore,
                  upvotes: prevUpvotes,
                  downvotes: prevDownvotes,
                }
              : t
          )
        );
        requestAuth("Verify email to vote on discussions", (freshToken) => {
          void performThreadVote(thread, value, freshToken);
        });
        return;
      }

      if (!res.ok) {
        throw await parseApiError(res);
      }

      const data = (await res.json()) as VoteResponse;
      setThreads((prev) =>
        prev.map((t) =>
          t.id === thread.id
            ? {
                ...t,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                score: data.score,
                myVote: data.myVote,
              }
            : t
        )
      );
    } catch (err) {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === thread.id
            ? {
                ...t,
                myVote: prevVote,
                score: prevScore,
                upvotes: prevUpvotes,
                downvotes: prevDownvotes,
              }
            : t
        )
      );
      showToast(
        err instanceof Error ? err.message : "Could not record vote.",
        "error"
      );
    } finally {
      setVotingIds((prev) => {
        const next = new Set(prev);
        next.delete(thread.id);
        return next;
      });
    }
  };

  const handleVoteClick = (thread: DiscussionThread, value: 1 | -1 | 0) => {
    if (!token) {
      requestAuth("Verify email to vote on discussions", (freshToken) => {
        void performThreadVote(thread, value, freshToken);
      });
      return;
    }
    void performThreadVote(thread, value);
  };

  const clearAllFilters = () => {
    setCategory("all");
    setTag("");
    setSearchInput("");
    setDebouncedSearch("");
    setSort("active");
    setPage(1);
  };

  const hasActiveFilters =
    category !== "all" || Boolean(tag) || Boolean(debouncedSearch);

  return (
    <div className="text-zinc-900 dark:text-zinc-50">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900/90 dark:to-zinc-950 py-10 sm:py-14">
        <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-180 h-72 rounded-full bg-linear-to-r from-cyan-500/10 via-teal-500/5 to-violet-500/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/80 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>Community Q&amp;A &amp; Technical Forum</span>
              </div>
              <h1 className="title-section mb-3">
                PiEEG Community Discussions
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ask signal-processing and ADS1299 hardware questions, share your
                BCI builds, upvote helpful answers, and collaborate directly
                with the PiEEG engineering team and researchers worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <AuthStatusChip
                currentUser={currentUser}
                onSignIn={() =>
                  requestAuth("Sign in to PiEEG Community", (freshToken) => {
                    showToast("Signed in!", "success");
                    void reloadThreadsManually(freshToken);
                  })
                }
                onSignOut={() => {
                  signOut();
                  setThreads((prev) => prev.map((t) => ({ ...t, myVote: 0 })));
                  showToast("Signed out.", "info");
                }}
              />
              <button
                type="button"
                onClick={handleOpenNewThread}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>New Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ModerationHoldNotice
          message={moderationNotice}
          onDismiss={() => setModerationNotice(null)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-8 items-start">
          {/* Left Column: Controls + Thread List */}
          <div className="min-w-0">
            {/* Search + Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search threads (e.g. 50Hz notch, ADS1299, Octopus-16, BLE)..."
                  aria-label="Search discussions"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div
                className="inline-flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 p-1 shrink-0 overflow-x-auto"
                role="tablist"
                aria-label="Sort discussions"
              >
                {SORT_OPTIONS.map((opt) => {
                  const active = sort === opt.id;
                  const Icon = opt.Icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setSort(opt.id);
                        setPage(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        active
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs border border-zinc-200/80 dark:border-zinc-700"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all cursor-pointer ${
                  category === "all"
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100"
                    : "bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                All Categories
              </button>
              {DISCUSSION_CATEGORIES.map((cat) => {
                const active = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? "bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:text-zinc-950 dark:border-cyan-400"
                        : "bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Active Tag / Filter summary bar */}
            {(tag || hasActiveFilters) && (
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Showing{" "}
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {total}
                    </strong>{" "}
                    {total === 1 ? "discussion" : "discussions"}
                  </span>
                  {tag && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => {
                          setTag("");
                          setPage(1);
                        }}
                        aria-label={`Clear tag filter ${tag}`}
                        className="hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            )}

            {/* Thread List States */}
            {fetchError ? (
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 p-8 text-center">
                <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2.5" />
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Unable to load discussions
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                  {fetchError}
                </p>
                <button
                  type="button"
                  onClick={() => void reloadThreadsManually()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try again</span>
                </button>
              </div>
            ) : loading && threads.length === 0 ? (
              <div className="space-y-3" aria-busy="true">
                {[1, 2, 3, 4].map((skeleton) => (
                  <div
                    key={skeleton}
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 animate-pulse"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0" />
                      <div className="flex-1 space-y-2.5">
                        <div className="h-4 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-5 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-3.5 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : threads.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-10 text-center">
                <MessageSquare className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  No discussions match your filters
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-5">
                  {hasActiveFilters
                    ? "Try clearing your search or category filter, or start a new discussion thread."
                    : "Be the first to ask a question or share what you are building with PiEEG!"}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      Clear filters
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleOpenNewThread}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 text-white dark:text-zinc-950 text-xs font-semibold cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Start a Discussion</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {threads.map((thread) => {
                  const catMeta = getCategoryMeta(thread.category);
                  const isSolved = thread.acceptedReplyId !== null;
                  const snippet =
                    thread.bodyPreview ||
                    (thread.body.length > 240
                      ? `${thread.body.slice(0, 240)}…`
                      : thread.body);

                  return (
                    <article
                      key={thread.id}
                      className={`group rounded-2xl border transition-all p-4 sm:p-5 ${
                        thread.isPinned
                          ? "border-cyan-300/80 dark:border-cyan-800/70 bg-cyan-50/20 dark:bg-cyan-950/15 hover:border-cyan-400 dark:hover:border-cyan-600"
                          : "border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        {/* Vote Column */}
                        <div className="shrink-0 pt-0.5">
                          <VoteControl
                            score={thread.score}
                            myVote={thread.myVote}
                            disabled={votingIds.has(thread.id)}
                            onVote={(val) => handleVoteClick(thread, val)}
                          />
                        </div>

                        {/* Thread Main Content */}
                        <div className="flex-1 min-w-0">
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            {thread.isPinned && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                                <Pin className="w-3 h-3" />
                                <span>Pinned</span>
                              </span>
                            )}
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${catMeta.pillClass}`}
                            >
                              {catMeta.label}
                            </span>
                            {isSolved && <SolvedBadge compact />}
                            {thread.isLocked && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                <Lock className="w-3 h-3" />
                                <span>Locked</span>
                              </span>
                            )}
                            {thread.moderationStatus === "flagged" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Pending Moderation</span>
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-1.5">
                            <Link
                              href={`/community/discussions/${thread.id}`}
                              className="focus:outline-none"
                            >
                              {thread.title}
                            </Link>
                          </h2>

                          {/* Preview */}
                          {snippet && (
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                              {snippet}
                            </p>
                          )}

                          {/* Tags */}
                          {thread.tags && thread.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mb-3">
                              {thread.tags.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => {
                                    setTag(t === tag ? "" : t);
                                    setPage(1);
                                  }}
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors cursor-pointer border ${
                                    tag === t
                                      ? "bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:text-zinc-950"
                                      : "bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border-zinc-200/70 dark:border-zinc-700/70 hover:border-cyan-400/60 hover:text-cyan-700 dark:hover:text-cyan-300"
                                  }`}
                                >
                                  #{t}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Footer Meta */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
                            <AuthorIdentity author={thread.author} size="sm" />

                            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                              <Link
                                href={`/community/discussions/${thread.id}`}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium transition-colors ${
                                  isSolved
                                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                                    : "hover:text-zinc-900 dark:hover:text-zinc-200"
                                }`}
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>
                                  {thread.replyCount}{" "}
                                  {thread.replyCount === 1
                                    ? "reply"
                                    : "replies"}
                                </span>
                              </Link>

                              <span className="inline-flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{thread.viewCount}</span>
                              </span>

                              <span title={thread.lastActivityAt}>
                                active{" "}
                                {formatRelativeTime(
                                  thread.lastActivityAt || thread.createdAt
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-cyan-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Page{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {page}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {totalPages}
                  </strong>{" "}
                  ({total} threads)
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-cyan-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            {/* Popular Tags */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
                <Tag className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Popular Topics</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_TAGS.map((t) => {
                  const active = tag === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTag(active ? "" : t);
                        setPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                        active
                          ? "bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:text-zinc-950"
                          : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-cyan-400/60 hover:text-cyan-700 dark:hover:text-cyan-300"
                      }`}
                    >
                      #{t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tips & Guidelines */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Tips for Fast Answers</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <li>
                  • Mention your board (<strong>PiEEG-8</strong>,{" "}
                  <strong>PiEEG-16</strong>, <strong>Octopus-16</strong>,{" "}
                  <strong>IronBCI</strong>) and power source (battery vs mains).
                </li>
                <li>
                  • Share register configs or Python/JS snippets inside{" "}
                  <code className="px-1 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 font-mono text-[11px]">
                    ```
                  </code>{" "}
                  code blocks.
                </li>
                <li>
                  • Mark the reply that solved your issue with{" "}
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    ✓ Mark as Solution
                  </strong>{" "}
                  to help future builders.
                </li>
              </ul>
            </div>

            {/* Helpful Resources */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Helpful Resources
              </p>
              <a
                href="https://docs.pieeg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-cyan-400/60 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>PiEEG Documentation</span>
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <Link
                href="/agent"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-cyan-400/60 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Ask Buddy AI Copilot</span>
                </span>
              </Link>
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-cyan-400/60 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Join PiEEG Discord</span>
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Modals & Toasts */}
      <DiscussionComposerModal
        open={composerOpen}
        mode="create"
        defaultCategory={category !== "all" ? category : "general"}
        submitting={composerSubmitting}
        error={composerError}
        onClose={() => setComposerOpen(false)}
        onSubmit={handleCreateThread}
      />

      <DiscussionAuthModal
        prompt={authPrompt}
        initialEmail={userEmail}
        onClose={closeAuthPrompt}
        onSuccess={(accessToken, refreshToken, email, user) => {
          saveSession(accessToken, refreshToken, email, user);
          showToast("Email verified!", "success");
        }}
      />

      <ToastNotification toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
