"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CornerDownRight,
  Edit3,
  Eye,
  Flag,
  Loader2,
  Lock,
  MessageSquare,
  Pin,
  Reply,
  Share2,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  DISCUSSIONS_API_URL,
  formatFullDateTime,
  formatRelativeTime,
  getCategoryMeta,
  parseApiError,
  type AcceptReplyResponse,
  type CreateReplyResponse,
  type CreateThreadPayload,
  type DiscussionDetailResponse,
  type DiscussionReply,
  type DiscussionThread,
  type VoteResponse,
} from "@/lib/discussions";
import {
  AuthStatusChip,
  AuthorIdentity,
  DiscussionAuthModal,
  ModerationHoldNotice,
  ReportModal,
  SolvedBadge,
  ToastNotification,
  VoteControl,
  useDiscussionsAuth,
  useToast,
} from "./DiscussionShared";
import {
  DiscussionMarkdown,
  DiscussionMarkdownEditor,
} from "./DiscussionMarkdown";
import { DiscussionComposerModal } from "./DiscussionComposerModal";

interface DiscussionDetailClientProps {
  threadId: string;
  initialDetail: DiscussionDetailResponse | null;
}

export default function DiscussionDetailClient({
  threadId,
  initialDetail,
}: DiscussionDetailClientProps) {
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

  const [thread, setThread] = useState<DiscussionThread | null>(
    initialDetail?.thread ?? null
  );
  const [replies, setReplies] = useState<DiscussionReply[]>(
    initialDetail?.replies ?? []
  );
  const [loading, setLoading] = useState<boolean>(!initialDetail);
  const [error, setError] = useState<string | null>(null);
  const [moderationNotice, setModerationNotice] = useState<string | null>(null);

  // Thread edit / delete states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [confirmDeleteThread, setConfirmDeleteThread] = useState(false);
  const [deletingThread, setDeletingThread] = useState(false);

  // Reply composer states
  const [replyBody, setReplyBody] = useState("");
  const [postingReply, setPostingReply] = useState(false);
  const [nestedTargetId, setNestedTargetId] = useState<string | null>(null);
  const [nestedBody, setNestedBody] = useState("");
  const [postingNested, setPostingNested] = useState(false);

  // Reply edit / delete states
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyBody, setEditingReplyBody] = useState("");
  const [savingReplyEdit, setSavingReplyEdit] = useState(false);
  const [deletingReplyId, setDeletingReplyId] = useState<string | null>(null);
  const [acceptingReplyId, setAcceptingReplyId] = useState<string | null>(null);

  // Voting & reporting states
  const [votingIds, setVotingIds] = useState<Set<string>>(new Set());
  const [reportTarget, setReportTarget] = useState<{
    type: "thread" | "reply";
    id: string;
    label: string;
  } | null>(null);
  const [reporting, setReporting] = useState(false);

  const replyFormRef = useRef<HTMLDivElement>(null);

  // Read any moderation-hold banner persisted from thread creation
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const key = `pieeg-mod-hold-${threadId}`;
        const stored = sessionStorage.getItem(key);
        if (stored) {
          setModerationNotice(stored);
          sessionStorage.removeItem(key);
        }
      } catch {
        // ignore
      }
    });
    return () => {
      cancelled = true;
    };
  }, [threadId]);

  const fetchDetailPayload = useCallback(
    async (
      overrideBearer?: string,
      signal?: AbortSignal
    ): Promise<DiscussionDetailResponse> => {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(threadId)}`,
        { method: "GET", signal },
        { overrideToken: overrideBearer }
      );
      if (!res.ok) {
        throw await parseApiError(res);
      }
      return (await res.json()) as DiscussionDetailResponse;
    },
    [fetchWithAuth, threadId]
  );

  const reloadThreadDetail = useCallback(
    async (overrideBearer?: string) => {
      if (!initialDetail) setLoading(true);
      setError(null);
      try {
        const data = await fetchDetailPayload(overrideBearer);
        setThread(data.thread);
        setReplies(Array.isArray(data.replies) ? data.replies : []);
      } catch (err) {
        if (!initialDetail) {
          setError(
            err instanceof Error ? err.message : "Could not load discussion."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchDetailPayload, initialDetail]
  );

  // Re-fetch when auth token becomes ready so myVote & own flagged items appear
  useEffect(() => {
    if (!authReady) return;
    if (!initialDetail || token) {
      const controller = new AbortController();
      const syncDetail = async () => {
        try {
          const data = await fetchDetailPayload(undefined, controller.signal);
          if (controller.signal.aborted) return;
          setError(null);
          setThread(data.thread);
          setReplies(Array.isArray(data.replies) ? data.replies : []);
        } catch (err) {
          if (controller.signal.aborted) return;
          if (!initialDetail) {
            setError(
              err instanceof Error ? err.message : "Could not load discussion."
            );
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      };
      void syncDetail();
      return () => controller.abort();
    }
  }, [authReady, token, initialDetail, fetchDetailPayload]);

  const canManageThread = Boolean(
    thread &&
      currentUser &&
      (currentUser.id === thread.authorId || currentUser.role === "admin")
  );

  const canAcceptSolution = canManageThread;

  // Group replies into top-level (sorted: isAccepted DESC, score DESC, createdAt ASC) + 1-level children
  const { topLevelReplies, childrenByParent } = useMemo(() => {
    const topIds = new Set(
      replies.filter((r) => !r.parentId).map((r) => r.id)
    );
    const top: DiscussionReply[] = [];
    const map = new Map<string, DiscussionReply[]>();

    for (const r of replies) {
      if (r.parentId && topIds.has(r.parentId)) {
        const list = map.get(r.parentId) ?? [];
        list.push(r);
        map.set(r.parentId, list);
      } else {
        top.push(r);
      }
    }

    top.sort((a, b) => {
      if (a.isAccepted !== b.isAccepted) return a.isAccepted ? -1 : 1;
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    for (const [, childList] of map) {
      childList.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return { topLevelReplies: top, childrenByParent: map };
  }, [replies]);

  /* ── Thread Voting ── */
  const performVoteOnThread = async (
    value: 1 | -1 | 0,
    overrideBearer?: string
  ) => {
    if (!thread || votingIds.has(thread.id)) return;
    const prev = { ...thread };
    const nextVote: 1 | -1 | 0 = thread.myVote === value ? 0 : value;
    const delta = nextVote - thread.myVote;

    setVotingIds((s) => new Set(s).add(thread.id));
    setThread({
      ...thread,
      myVote: nextVote,
      score: thread.score + delta,
    });

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
        setThread(prev);
        requestAuth("Verify email to vote", (fresh) => {
          void performVoteOnThread(value, fresh);
        });
        return;
      }
      if (!res.ok) throw await parseApiError(res);

      const data = (await res.json()) as VoteResponse;
      setThread((curr) =>
        curr
          ? {
              ...curr,
              upvotes: data.upvotes,
              downvotes: data.downvotes,
              score: data.score,
              myVote: data.myVote,
            }
          : curr
      );
    } catch (err) {
      setThread(prev);
      showToast(
        err instanceof Error ? err.message : "Could not record vote.",
        "error"
      );
    } finally {
      setVotingIds((s) => {
        const next = new Set(s);
        next.delete(thread.id);
        return next;
      });
    }
  };

  /* ── Reply Voting ── */
  const performVoteOnReply = async (
    reply: DiscussionReply,
    value: 1 | -1 | 0,
    overrideBearer?: string
  ) => {
    if (votingIds.has(reply.id)) return;
    const prevVote = reply.myVote;
    const prevScore = reply.score;
    const prevUpvotes = reply.upvotes;
    const prevDownvotes = reply.downvotes;

    const nextVote: 1 | -1 | 0 = prevVote === value ? 0 : value;
    const delta = nextVote - prevVote;

    setVotingIds((s) => new Set(s).add(reply.id));
    setReplies((prev) =>
      prev.map((r) =>
        r.id === reply.id
          ? { ...r, myVote: nextVote, score: r.score + delta }
          : r
      )
    );

    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/replies/${encodeURIComponent(reply.id)}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        },
        { requireAuth: true, overrideToken: overrideBearer }
      );

      if (res.status === 401) {
        setReplies((prev) =>
          prev.map((r) =>
            r.id === reply.id
              ? {
                  ...r,
                  myVote: prevVote,
                  score: prevScore,
                  upvotes: prevUpvotes,
                  downvotes: prevDownvotes,
                }
              : r
          )
        );
        requestAuth("Verify email to vote", (fresh) => {
          void performVoteOnReply(reply, value, fresh);
        });
        return;
      }
      if (!res.ok) throw await parseApiError(res);

      const data = (await res.json()) as VoteResponse;
      setReplies((prev) =>
        prev.map((r) =>
          r.id === reply.id
            ? {
                ...r,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                score: data.score,
                myVote: data.myVote,
              }
            : r
        )
      );
    } catch (err) {
      setReplies((prev) =>
        prev.map((r) =>
          r.id === reply.id
            ? {
                ...r,
                myVote: prevVote,
                score: prevScore,
                upvotes: prevUpvotes,
                downvotes: prevDownvotes,
              }
            : r
        )
      );
      showToast(
        err instanceof Error ? err.message : "Could not record vote.",
        "error"
      );
    } finally {
      setVotingIds((s) => {
        const next = new Set(s);
        next.delete(reply.id);
        return next;
      });
    }
  };

  /* ── Edit / Delete Thread ── */
  const handleUpdateThread = async (payload: CreateThreadPayload) => {
    if (!thread) return;
    setEditSubmitting(true);
    setEditError(null);
    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(thread.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        { requireAuth: true }
      );
      if (!res.ok) throw await parseApiError(res);
      const data = await res.json();
      if (data?.thread) {
        setThread(data.thread);
      } else {
        setThread((curr) => (curr ? { ...curr, ...payload } : curr));
      }
      if (data?.moderationHold) {
        setModerationNotice(
          data.message || "Your updated post is queued for moderator review."
        );
      } else {
        showToast("Thread updated!", "success");
      }
      setEditModalOpen(false);
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "Could not update thread."
      );
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!thread) return;
    setDeletingThread(true);
    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(thread.id)}`,
        { method: "DELETE" },
        { requireAuth: true }
      );
      if (!res.ok) throw await parseApiError(res);
      showToast("Discussion deleted.", "info");
      router.push("/community/discussions");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not delete thread.",
        "error"
      );
      setDeletingThread(false);
      setConfirmDeleteThread(false);
    }
  };

  /* ── Post Reply (Top-level or 1-level nested) ── */
  const submitReply = async (
    bodyText: string,
    parentId: string | null,
    overrideBearer?: string
  ) => {
    if (!thread) return;
    const trimmed = bodyText.trim();
    if (trimmed.length < 2) {
      showToast("Please write a reply before posting.", "warning");
      return;
    }

    if (parentId) setPostingNested(true);
    else setPostingReply(true);

    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(thread.id)}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: trimmed, parentId }),
        },
        { requireAuth: true, overrideToken: overrideBearer }
      );

      if (res.status === 401) {
        requestAuth("Verify email to post your reply", (fresh) => {
          void submitReply(trimmed, parentId, fresh);
        });
        return;
      }

      if (!res.ok) throw await parseApiError(res);

      const created = (await res.json()) as CreateReplyResponse;
      setReplies((prev) => [...prev, created.reply]);
      setThread((curr) =>
        curr ? { ...curr, replyCount: curr.replyCount + 1 } : curr
      );

      if (parentId) {
        setNestedBody("");
        setNestedTargetId(null);
      } else {
        setReplyBody("");
      }

      if (created.moderationHold) {
        setModerationNotice(
          created.message ||
            "Your reply is queued for moderator approval and currently visible to you."
        );
      } else {
        showToast("Reply posted!", "success");
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not post reply.",
        "error"
      );
    } finally {
      if (parentId) setPostingNested(false);
      else setPostingReply(false);
    }
  };

  /* ── Edit / Delete Reply ── */
  const handleSaveReplyEdit = async (replyId: string) => {
    const trimmed = editingReplyBody.trim();
    if (trimmed.length < 2) return;
    setSavingReplyEdit(true);
    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/replies/${encodeURIComponent(replyId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: trimmed }),
        },
        { requireAuth: true }
      );
      if (!res.ok) throw await parseApiError(res);
      const data = await res.json();
      setReplies((prev) =>
        prev.map((r) =>
          r.id === replyId
            ? data?.reply ?? {
                ...r,
                body: trimmed,
                updatedAt: new Date().toISOString(),
              }
            : r
        )
      );
      if (data?.moderationHold) {
        setModerationNotice(
          data.message || "Your edited reply is queued for moderator review."
        );
      } else {
        showToast("Reply updated!", "success");
      }
      setEditingReplyId(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not update reply.",
        "error"
      );
    } finally {
      setSavingReplyEdit(false);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    setDeletingReplyId(replyId);
    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/replies/${encodeURIComponent(replyId)}`,
        { method: "DELETE" },
        { requireAuth: true }
      );
      if (!res.ok) throw await parseApiError(res);

      setReplies((prev) =>
        prev.filter((r) => r.id !== replyId && r.parentId !== replyId)
      );
      setThread((curr) =>
        curr
          ? {
              ...curr,
              replyCount: Math.max(0, curr.replyCount - 1),
              acceptedReplyId:
                curr.acceptedReplyId === replyId ? null : curr.acceptedReplyId,
            }
          : curr
      );
      showToast("Reply deleted.", "info");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not delete reply.",
        "error"
      );
    } finally {
      setDeletingReplyId(null);
    }
  };

  /* ── Accept Solution Toggle ── */
  const handleToggleAccept = async (replyId: string) => {
    if (!thread || acceptingReplyId) return;
    setAcceptingReplyId(replyId);
    try {
      const res = await fetchWithAuth(
        `${DISCUSSIONS_API_URL}/${encodeURIComponent(thread.id)}/accept/${encodeURIComponent(replyId)}`,
        { method: "POST" },
        { requireAuth: true }
      );
      if (!res.ok) throw await parseApiError(res);

      const data = (await res.json()) as AcceptReplyResponse;
      const nextAccepted = data.acceptedReplyId ?? null;
      setThread(
        data.thread ?? {
          ...thread,
          acceptedReplyId: nextAccepted,
        }
      );
      setReplies((prev) =>
        prev.map((r) => ({
          ...r,
          isAccepted: r.id === nextAccepted,
        }))
      );
      showToast(
        nextAccepted
          ? "Marked as Accepted Solution!"
          : "Accepted Solution unmarked.",
        "success"
      );
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not update solution status.",
        "error"
      );
    } finally {
      setAcceptingReplyId(null);
    }
  };

  /* ── Report Thread or Reply ── */
  const handleSubmitReport = async (reason: string) => {
    if (!reportTarget) return;
    setReporting(true);
    try {
      const endpoint =
        reportTarget.type === "thread"
          ? `${DISCUSSIONS_API_URL}/${encodeURIComponent(reportTarget.id)}/report`
          : `${DISCUSSIONS_API_URL}/replies/${encodeURIComponent(reportTarget.id)}/report`;

      const res = await fetchWithAuth(
        endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        },
        { requireAuth: true }
      );

      if (res.status === 401) {
        const savedTarget = reportTarget;
        setReportTarget(null);
        requestAuth("Verify email to submit a report", () => {
          setReportTarget(savedTarget);
        });
        return;
      }
      if (!res.ok) throw await parseApiError(res);

      setReportTarget(null);
      showToast(
        "Thank you — moderators have received your report.",
        "success"
      );
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not submit report.",
        "error"
      );
    } finally {
      setReporting(false);
    }
  };

  const handleShare = () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://pieeg.com/community/discussions/${threadId}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("Link copied to clipboard!", "success");
      });
    }
  };

  const renderReplyItem = (reply: DiscussionReply, isNested = false) => {
    const canManageReply = Boolean(
      currentUser &&
        (currentUser.id === reply.authorId || currentUser.role === "admin")
    );
    const isEditing = editingReplyId === reply.id;
    const wasEdited =
      reply.updatedAt &&
      reply.createdAt &&
      new Date(reply.updatedAt).getTime() -
        new Date(reply.createdAt).getTime() >
        5_000;

    return (
      <div
        key={reply.id}
        id={`reply-${reply.id}`}
        className={`rounded-2xl border transition-colors ${
          reply.isAccepted
            ? "border-emerald-400 dark:border-emerald-600/80 bg-emerald-50/25 dark:bg-emerald-950/15 shadow-xs"
            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40"
        } ${isNested ? "p-3.5 sm:p-4" : "p-4 sm:p-5"}`}
      >
        {reply.isAccepted && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-3 pb-2.5 border-b border-emerald-200/80 dark:border-emerald-800/70">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Accepted Solution</span>
          </div>
        )}

        <div className="flex items-start gap-3 sm:gap-4">
          <div className="shrink-0">
            <VoteControl
              score={reply.score}
              myVote={reply.myVote}
              disabled={votingIds.has(reply.id)}
              orientation={isNested ? "horizontal" : "vertical"}
              onVote={(val) => {
                if (!token) {
                  requestAuth("Verify email to vote on replies", (fresh) => {
                    void performVoteOnReply(reply, val, fresh);
                  });
                  return;
                }
                void performVoteOnReply(reply, val);
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <AuthorIdentity author={reply.author} size="sm" />
                <span
                  className="text-xs text-zinc-400 dark:text-zinc-500"
                  title={formatFullDateTime(reply.createdAt)}
                >
                  · {formatRelativeTime(reply.createdAt)}
                  {wasEdited ? " (edited)" : ""}
                </span>
                {reply.moderationStatus === "flagged" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Pending Moderation</span>
                  </span>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-2.5 my-2">
                <DiscussionMarkdownEditor
                  value={editingReplyBody}
                  onChange={setEditingReplyBody}
                  rows={4}
                  disabled={savingReplyEdit}
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={savingReplyEdit}
                    onClick={() => setEditingReplyId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={savingReplyEdit}
                    onClick={() => void handleSaveReplyEdit(reply.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold cursor-pointer disabled:opacity-60"
                  >
                    {savingReplyEdit && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>Save Reply</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <DiscussionMarkdown content={reply.body} compact={isNested} />
              </div>
            )}

            {/* Reply Actions */}
            {!isEditing && (
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/70 text-xs">
                {!isNested && thread && !thread.isLocked && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!token) {
                        requestAuth("Verify email to reply", () => {
                          setNestedTargetId(reply.id);
                          setNestedBody("");
                        });
                        return;
                      }
                      setNestedTargetId(
                        nestedTargetId === reply.id ? null : reply.id
                      );
                      setNestedBody("");
                    }}
                    className="inline-flex items-center gap-1 font-medium text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                )}

                {canAcceptSolution && !isNested && (
                  <button
                    type="button"
                    disabled={acceptingReplyId === reply.id}
                    onClick={() => void handleToggleAccept(reply.id)}
                    className={`inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                      reply.isAccepted
                        ? "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                        : "text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {reply.isAccepted
                        ? "Unmark Solution"
                        : "Mark as Solution"}
                    </span>
                  </button>
                )}

                {canManageReply && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReplyId(reply.id);
                        setEditingReplyBody(reply.body);
                      }}
                      className="inline-flex items-center gap-1 font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={deletingReplyId === reply.id}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Delete this reply permanently?"
                          )
                        ) {
                          void handleDeleteReply(reply.id);
                        }
                      }}
                      className="inline-flex items-center gap-1 font-medium text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>
                        {deletingReplyId === reply.id ? "Deleting…" : "Delete"}
                      </span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!token) {
                      requestAuth("Verify email to report content", () => {
                        setReportTarget({
                          type: "reply",
                          id: reply.id,
                          label: `reply by ${reply.author.name}`,
                        });
                      });
                      return;
                    }
                    setReportTarget({
                      type: "reply",
                      id: reply.id,
                      label: `reply by ${reply.author.name}`,
                    });
                  }}
                  className="inline-flex items-center gap-1 font-medium text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 ml-auto transition-colors cursor-pointer"
                >
                  <Flag className="w-3 h-3" />
                  <span>Report</span>
                </button>
              </div>
            )}

            {/* Inline 1-level nested reply box */}
            {!isNested && nestedTargetId === reply.id && (
              <div className="mt-3.5 pt-3.5 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <CornerDownRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Replying to {reply.author.name}</span>
                </p>
                <DiscussionMarkdownEditor
                  value={nestedBody}
                  onChange={setNestedBody}
                  rows={3}
                  disabled={postingNested}
                  placeholder={`Reply to ${reply.author.name}...`}
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={postingNested}
                    onClick={() => setNestedTargetId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={postingNested || nestedBody.trim().length < 2}
                    onClick={() => void submitReply(nestedBody, reply.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold disabled:opacity-60 cursor-pointer"
                  >
                    {postingNested && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>Post Reply</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-zinc-900 dark:text-zinc-50">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Link
          href="/community/discussions"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discussions</span>
        </Link>

        <AuthStatusChip
          currentUser={currentUser}
          onSignIn={() =>
            requestAuth("Sign in to PiEEG Community", (fresh) => {
              showToast("Signed in!", "success");
              void reloadThreadDetail(fresh);
            })
          }
          onSignOut={() => {
            signOut();
            setThread((curr) => (curr ? { ...curr, myVote: 0 } : curr));
            setReplies((prev) => prev.map((r) => ({ ...r, myVote: 0 })));
            showToast("Signed out.", "info");
          }}
        />
      </div>

      <ModerationHoldNotice
        message={moderationNotice}
        onDismiss={() => setModerationNotice(null)}
      />

      {loading ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 animate-pulse space-y-4">
          <div className="h-5 w-36 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-8 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      ) : error || !thread ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-10 text-center">
          <AlertTriangle className="w-9 h-9 text-amber-500 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
            {error || "Discussion not found"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
            This thread may have been removed or is awaiting moderator review.
          </p>
          <Link
            href="/community/discussions"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse all discussions</span>
          </Link>
        </div>
      ) : (
        <>
          {/* ── Main Thread Card ── */}
          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 sm:p-7 shadow-2xs mb-8">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Vote Column */}
              <div className="shrink-0 pt-1">
                <VoteControl
                  score={thread.score}
                  myVote={thread.myVote}
                  disabled={votingIds.has(thread.id)}
                  onVote={(val) => {
                    if (!token) {
                      requestAuth("Verify email to vote", (fresh) => {
                        void performVoteOnThread(val, fresh);
                      });
                      return;
                    }
                    void performVoteOnThread(val);
                  }}
                />
              </div>

              {/* Thread Content */}
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {thread.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                      <Pin className="w-3 h-3" />
                      <span>Pinned</span>
                    </span>
                  )}
                  <Link
                    href={`/community/discussions?category=${thread.category}`}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryMeta(thread.category).pillClass}`}
                  >
                    {getCategoryMeta(thread.category).label}
                  </Link>
                  {thread.acceptedReplyId !== null && <SolvedBadge />}
                  {thread.isLocked && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                  {thread.moderationStatus === "flagged" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Pending Moderation</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
                  {thread.title}
                </h1>

                {/* Author & Stats row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-zinc-200/80 dark:border-zinc-800">
                  <AuthorIdentity
                    author={thread.author}
                    size="md"
                    subtitle={`Posted ${formatRelativeTime(thread.createdAt)}`}
                  />

                  <div className="flex items-center gap-3.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{thread.viewCount} views</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {replies.length}{" "}
                        {replies.length === 1 ? "reply" : "replies"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Markdown Body */}
                <div className="mb-5">
                  <DiscussionMarkdown content={thread.body} />
                </div>

                {/* Tags */}
                {thread.tags && thread.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    {thread.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/community/discussions?tag=${encodeURIComponent(t)}`}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-cyan-400/60 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Thread Action Footer */}
                <div className="flex flex-wrap items-center gap-3 pt-3.5 border-t border-zinc-200/80 dark:border-zinc-800 text-xs">
                  {!thread.isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        replyFormRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-semibold hover:bg-cyan-100/70 transition-colors cursor-pointer"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Write a Reply</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  {canManageThread && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditError(null);
                          setEditModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {!confirmDeleteThread ? (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteThread(true)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800">
                          <span className="text-rose-700 dark:text-rose-300 font-semibold">
                            Delete thread?
                          </span>
                          <button
                            type="button"
                            disabled={deletingThread}
                            onClick={() => void handleDeleteThread()}
                            className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold cursor-pointer"
                          >
                            {deletingThread ? "Deleting…" : "Yes"}
                          </button>
                          <button
                            type="button"
                            disabled={deletingThread}
                            onClick={() => setConfirmDeleteThread(false)}
                            className="text-zinc-600 dark:text-zinc-400 font-medium cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (!token) {
                        requestAuth("Verify email to report content", () => {
                          setReportTarget({
                            type: "thread",
                            id: thread.id,
                            label: "this discussion",
                          });
                        });
                        return;
                      }
                      setReportTarget({
                        type: "thread",
                        id: thread.id,
                        label: "this discussion",
                      });
                    }}
                    className="inline-flex items-center gap-1 font-medium text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 ml-auto transition-colors cursor-pointer"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* ── Replies List ── */}
          <section aria-label="Replies" className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
              </h2>
              {canAcceptSolution &&
                replies.length > 0 &&
                thread.acceptedReplyId === null && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Did an answer help? Click{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      Mark as Solution
                    </strong>{" "}
                    on the best reply.
                  </span>
                )}
            </div>

            {topLevelReplies.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                No replies yet — share your knowledge or troubleshooting tips
                below!
              </div>
            ) : (
              <div className="space-y-4">
                {topLevelReplies.map((topReply) => {
                  const nested = childrenByParent.get(topReply.id) ?? [];
                  return (
                    <div key={topReply.id} className="space-y-2.5">
                      {renderReplyItem(topReply, false)}
                      {nested.length > 0 && (
                        <div className="pl-6 sm:pl-11 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-2.5 ml-3 sm:ml-5">
                          {nested.map((child) => renderReplyItem(child, true))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── Bottom Reply Composer ── */}
          <section ref={replyFormRef}>
            {thread.isLocked ? (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Lock className="w-5 h-5 text-zinc-400 shrink-0" />
                <span>
                  This discussion is locked and no longer accepting new replies.
                </span>
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 sm:p-6">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Your Reply
                </h3>
                <DiscussionMarkdownEditor
                  value={replyBody}
                  onChange={setReplyBody}
                  rows={5}
                  disabled={postingReply}
                  placeholder="Write a helpful answer, register setting, or follow-up question (Markdown & code blocks supported)..."
                />
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {currentUser
                      ? `Posting as ${currentUser.email || currentUser.name || "verified member"}`
                      : "You'll verify with a quick 6-digit email code when posting."}
                  </span>
                  <button
                    type="button"
                    disabled={postingReply || replyBody.trim().length < 2}
                    onClick={() => {
                      if (!token) {
                        requestAuth(
                          "Verify email to post your reply",
                          (fresh) => {
                            void submitReply(replyBody, null, fresh);
                          }
                        );
                        return;
                      }
                      void submitReply(replyBody, null);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {postingReply && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    <span>{postingReply ? "Posting…" : "Post Reply"}</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Edit Thread Modal */}
          <DiscussionComposerModal
            open={editModalOpen}
            mode="edit"
            initialThread={thread}
            submitting={editSubmitting}
            error={editError}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleUpdateThread}
          />
        </>
      )}

      {/* Report Modal */}
      <ReportModal
        open={Boolean(reportTarget)}
        targetLabel={reportTarget?.label || "content"}
        loading={reporting}
        onClose={() => setReportTarget(null)}
        onSubmit={handleSubmitReport}
      />

      {/* OTP Auth Modal */}
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
