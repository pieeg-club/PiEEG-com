"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Award,
  CheckCircle2,
  X,
  Mail,
  Flag,
  AlertTriangle,
  Loader2,
  LogOut,
  UserCheck,
} from "lucide-react";
import {
  AUTH_OTP_REQUEST_URL,
  AUTH_OTP_VERIFY_URL,
  AUTH_REFRESH_URL,
  LS_EMAIL_KEY,
  LS_REFRESH_KEY,
  LS_TOKEN_KEY,
  LS_USER_KEY,
  deriveCurrentUser,
  getInitials,
  isContributorBadge,
  isCoreTeamAuthor,
  type CurrentAuthUser,
  type DiscussionAuthor,
} from "@/lib/discussions";

/* ============================================================================
   Auth Hook (Passwordless 6-digit Email OTP + JWT Refresh)
   ============================================================================ */

export interface PendingAuthPrompt {
  actionLabel: string;
  onVerified?: (newToken: string) => void;
}

export function useDiscussionsAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [storedUser, setStoredUser] =
    useState<Partial<CurrentAuthUser> | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authPrompt, setAuthPrompt] = useState<PendingAuthPrompt | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const savedToken = localStorage.getItem(LS_TOKEN_KEY);
        const savedEmail = localStorage.getItem(LS_EMAIL_KEY);
        const savedUserRaw = localStorage.getItem(LS_USER_KEY);
        if (savedToken) setToken(savedToken);
        if (savedEmail) setUserEmail(savedEmail);
        if (savedUserRaw) {
          const parsed = JSON.parse(savedUserRaw);
          if (parsed && typeof parsed === "object") setStoredUser(parsed);
        }
      } catch {
        // ignore storage errors
      } finally {
        setAuthReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentUser = deriveCurrentUser(token, userEmail, storedUser);

  const saveSession = useCallback(
    (
      nextToken: string,
      nextRefresh?: string | null,
      email?: string | null,
      apiUser?: Record<string, unknown> | null
    ) => {
      setToken(nextToken);
      if (email) setUserEmail(email);
      let userMeta: Partial<CurrentAuthUser> | null = null;
      if (apiUser && typeof apiUser === "object") {
        userMeta = {
          id:
            (typeof apiUser.id === "string" && apiUser.id) ||
            (typeof apiUser._id === "string" && apiUser._id) ||
            undefined,
          name: typeof apiUser.name === "string" ? apiUser.name : undefined,
          email:
            typeof apiUser.email === "string"
              ? apiUser.email
              : email || undefined,
          role: apiUser.role === "admin" ? "admin" : "user",
        };
        setStoredUser(userMeta);
      }
      try {
        localStorage.setItem(LS_TOKEN_KEY, nextToken);
        if (nextRefresh) localStorage.setItem(LS_REFRESH_KEY, nextRefresh);
        if (email) localStorage.setItem(LS_EMAIL_KEY, email);
        if (userMeta) {
          localStorage.setItem(LS_USER_KEY, JSON.stringify(userMeta));
        }
      } catch {
        // ignore storage errors
      }
    },
    []
  );

  const clearSession = useCallback(() => {
    setToken(null);
    setStoredUser(null);
    try {
      localStorage.removeItem(LS_TOKEN_KEY);
      localStorage.removeItem(LS_REFRESH_KEY);
      localStorage.removeItem(LS_USER_KEY);
    } catch {
      // ignore storage errors
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem(LS_REFRESH_KEY);
      if (!refreshToken) {
        clearSession();
        return null;
      }
      const res = await fetch(AUTH_REFRESH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) {
        clearSession();
        return null;
      }
      const data = await res.json().catch(() => null);
      const nextAccess: string | undefined =
        data?.access?.token || data?.tokens?.access?.token;
      const nextRefresh: string | undefined =
        data?.refresh?.token || data?.tokens?.refresh?.token;
      if (nextAccess) {
        saveSession(nextAccess, nextRefresh, userEmail, data?.user ?? null);
        return nextAccess;
      }
      clearSession();
      return null;
    } catch {
      return null;
    }
  }, [clearSession, saveSession, userEmail]);

  /**
   * Performs a fetch attaching `Authorization: Bearer <token>` if available,
   * and transparently refreshes once on 401.
   */
  const fetchWithAuth = useCallback(
    async (
      url: string,
      init: RequestInit = {},
      options: { requireAuth?: boolean; overrideToken?: string } = {}
    ): Promise<Response> => {
      const activeToken =
        options.overrideToken ??
        token ??
        (typeof window !== "undefined"
          ? localStorage.getItem(LS_TOKEN_KEY)
          : null);

      const buildHeaders = (bearer: string | null) => {
        const headers = new Headers(init.headers);
        if (bearer) {
          headers.set("Authorization", `Bearer ${bearer}`);
        } else {
          headers.delete("Authorization");
        }
        return headers;
      };

      const res = await fetch(url, {
        ...init,
        headers: buildHeaders(activeToken),
        cache: "no-store",
      });

      if (res.status === 401 && activeToken) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return fetch(url, {
            ...init,
            headers: buildHeaders(refreshed),
            cache: "no-store",
          });
        }
        // For optional-auth GET endpoints, fall back cleanly to guest view
        if (!options.requireAuth && (!init.method || init.method === "GET")) {
          return fetch(url, {
            ...init,
            headers: buildHeaders(null),
            cache: "no-store",
          });
        }
      }

      return res;
    },
    [refreshAccessToken, token]
  );

  const requestAuth = useCallback(
    (actionLabel: string, onVerified?: (newToken: string) => void) => {
      setAuthPrompt({ actionLabel, onVerified });
    },
    []
  );

  const closeAuthPrompt = useCallback(() => {
    setAuthPrompt(null);
  }, []);

  return {
    token,
    userEmail,
    currentUser,
    authReady,
    authPrompt,
    requestAuth,
    closeAuthPrompt,
    saveSession,
    signOut: clearSession,
    fetchWithAuth,
  };
}

/* ============================================================================
   Email OTP Verification Modal
   ============================================================================ */

export function DiscussionAuthModal(props: {
  prompt: PendingAuthPrompt | null;
  initialEmail?: string | null;
  onClose: () => void;
  onSuccess: (
    accessToken: string,
    refreshToken: string | null,
    email: string,
    user: Record<string, unknown> | null
  ) => void;
}) {
  if (!props.prompt) return null;
  return (
    <DiscussionAuthDialog
      key={props.prompt.actionLabel}
      prompt={props.prompt}
      initialEmail={props.initialEmail}
      onClose={props.onClose}
      onSuccess={props.onSuccess}
    />
  );
}

function DiscussionAuthDialog({
  prompt,
  initialEmail,
  onClose,
  onSuccess,
}: {
  prompt: PendingAuthPrompt;
  initialEmail?: string | null;
  onClose: () => void;
  onSuccess: (
    accessToken: string,
    refreshToken: string | null,
    email: string,
    user: Record<string, unknown> | null
  ) => void;
}) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(AUTH_OTP_REQUEST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(
          data?.message ||
            "Could not send verification code. Please try again."
        );
        return;
      }
      setStep("otp");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.trim();
    if (trimmedOtp.length !== 6) {
      setError("Please enter the 6-digit code sent to your email.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(AUTH_OTP_VERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          otp: trimmedOtp,
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message || "Invalid or expired verification code.");
        return;
      }

      const accessToken: string | undefined =
        data?.access?.token || data?.tokens?.access?.token;
      const refreshToken: string | null =
        data?.refresh?.token || data?.tokens?.refresh?.token || null;

      if (!accessToken) {
        setError("Verification succeeded, but no session token was returned.");
        return;
      }

      const callback = prompt.onVerified;
      onSuccess(accessToken, refreshToken, trimmedEmail, data?.user ?? null);
      onClose();
      if (callback) callback(accessToken);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discussions-auth-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>One-time Email Verification</span>
        </div>

        <h3
          id="discussions-auth-title"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1.5"
        >
          {step === "email" ? prompt.actionLabel : "Enter your 6-digit code"}
        </h3>

        {step === "email" ? (
          <>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Enter your email to receive a passwordless 6-digit sign-in code.
              You stay signed in across PiEEG Community pages (never used for
              marketing).
            </p>
            <form onSubmit={handleRequestCode} className="space-y-3.5">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />
              <div>
                <label
                  htmlFor="disc-auth-email"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="disc-auth-email"
                  type="email"
                  required
                  autoFocus
                  disabled={loading}
                  placeholder="researcher@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? "Sending code…" : "Send 6-digit code"}</span>
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {email}
              </span>
              . Enter it below to continue.
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-3.5">
              <div>
                <label
                  htmlFor="disc-auth-otp"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  6-digit verification code
                </label>
                <input
                  id="disc-auth-otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  autoFocus
                  disabled={loading}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-center tracking-[0.35em] font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? "Verifying…" : "Verify & Continue"}</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setStep("email");
                    setError(null);
                  }}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 py-1 cursor-pointer"
                >
                  Use a different email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   Author Badge & Identity Pill
   ============================================================================ */

export function AuthorBadgePill({ author }: { author: DiscussionAuthor }) {
  if (!author.badge) return null;

  const isCore = isCoreTeamAuthor(author);
  const isContrib = !isCore && isContributorBadge(author.badge);

  if (isCore) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-linear-to-r from-cyan-500/15 to-emerald-500/15 dark:from-cyan-500/20 dark:to-emerald-500/20 text-cyan-800 dark:text-cyan-200 border border-cyan-400/50 dark:border-cyan-500/40">
        <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
        <span>{author.badge}</span>
      </span>
    );
  }

  if (isContrib) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
        <Award className="w-3 h-3 shrink-0" />
        <span>{author.badge}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
      {author.badge}
    </span>
  );
}

export function AuthorIdentity({
  author,
  size = "sm",
  subtitle,
}: {
  author: DiscussionAuthor;
  size?: "sm" | "md";
  subtitle?: string;
}) {
  const isCore = isCoreTeamAuthor(author);
  const avatarSizes =
    size === "md" ? "w-9 h-9 text-xs" : "w-7 h-7 text-[11px]";

  return (
    <div className="inline-flex items-center gap-2.5 min-w-0 flex-wrap">
      <div
        className={`${avatarSizes} rounded-full font-bold flex items-center justify-center shrink-0 border ${
          isCore
            ? "bg-linear-to-br from-cyan-500 to-teal-600 text-white border-cyan-400/40 shadow-2xs"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
        }`}
        aria-hidden="true"
      >
        {getInitials(author.name)}
      </div>
      <div className="flex items-center gap-2 flex-wrap min-w-0">
        <span
          className={`font-semibold text-zinc-900 dark:text-zinc-100 truncate ${
            size === "md" ? "text-sm" : "text-xs sm:text-sm"
          }`}
        >
          {author.name}
        </span>
        <AuthorBadgePill author={author} />
        {subtitle && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            · {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export function SolvedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 ${
        compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <CheckCircle2 className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>Solved</span>
    </span>
  );
}

/* ============================================================================
   StackOverflow-Style Vote Control
   ============================================================================ */

export function VoteControl({
  score,
  myVote,
  onVote,
  orientation = "vertical",
  disabled = false,
}: {
  score: number;
  myVote: 1 | -1 | 0;
  onVote: (value: 1 | -1 | 0) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`inline-flex items-center ${
        isVertical
          ? "flex-col gap-0.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 px-1.5 py-1.5"
          : "flex-row gap-1 rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 px-1.5 py-0.5"
      }`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onVote(myVote === 1 ? 0 : 1);
        }}
        aria-label={myVote === 1 ? "Remove upvote" : "Upvote"}
        aria-pressed={myVote === 1}
        className={`p-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
          myVote === 1
            ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
            : "text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
        }`}
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
      </button>

      <span
        className={`font-mono text-xs sm:text-sm font-bold tabular-nums px-1 select-none ${
          myVote === 1
            ? "text-cyan-600 dark:text-cyan-400"
            : myVote === -1
              ? "text-rose-600 dark:text-rose-400"
              : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {score}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onVote(myVote === -1 ? 0 : -1);
        }}
        aria-label={myVote === -1 ? "Remove downvote" : "Downvote"}
        aria-pressed={myVote === -1}
        className={`p-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
          myVote === -1
            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
        }`}
      >
        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}

/* ============================================================================
   Auth Status Chip (Header bar)
   ============================================================================ */

export function AuthStatusChip({
  currentUser,
  onSignIn,
  onSignOut,
}: {
  currentUser: CurrentAuthUser | null;
  onSignIn: () => void;
  onSignOut: () => void;
}) {
  if (!currentUser) {
    return (
      <button
        type="button"
        onClick={onSignIn}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-400 dark:hover:border-cyan-500/60 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
      >
        <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span>Sign in with Email</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-xs">
      <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span className="text-zinc-700 dark:text-zinc-300 font-medium max-w-44 truncate">
        {currentUser.email || currentUser.name || "Verified Member"}
      </span>
      {currentUser.role === "admin" && (
        <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold text-[10px] uppercase">
          Admin
        </span>
      )}
      <button
        type="button"
        onClick={onSignOut}
        title="Sign out"
        className="p-0.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ============================================================================
   Report Modal (Threads & Replies)
   ============================================================================ */

const REPORT_PRESETS = [
  "Spam or promotional link",
  "Harassment or disrespectful behavior",
  "Off-topic or misleading content",
  "Unsafe medical/electrical advice",
];

export function ReportModal({
  targetLabel,
  open,
  loading,
  onClose,
  onSubmit,
}: {
  targetLabel: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState(REPORT_PRESETS[0]);
  const [details, setDetails] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combined = details.trim()
      ? `${selectedPreset}: ${details.trim()}`
      : selectedPreset;
    onSubmit(combined);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-semibold uppercase tracking-wider mb-3">
          <Flag className="w-3.5 h-3.5" />
          <span>Report to Moderators</span>
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          Report {targetLabel}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Help keep PiEEG Community constructive and spam-free.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-2">
            {REPORT_PRESETS.map((preset) => (
              <label
                key={preset}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                  selectedPreset === preset
                    ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 text-zinc-900 dark:text-zinc-100 font-medium"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={preset}
                  checked={selectedPreset === preset}
                  onChange={() => setSelectedPreset(preset)}
                  className="accent-cyan-600"
                />
                <span>{preset}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Additional context (optional)
            </label>
            <textarea
              rows={2}
              maxLength={300}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Optional details for moderators..."
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   Moderation Hold Notice & Floating Toast
   ============================================================================ */

export function ModerationHoldNotice({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div className="mb-6 rounded-2xl border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/50 px-4 py-3.5 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900 dark:text-amber-200">
          <p className="font-semibold mb-0.5">Queued for Moderator Review</p>
          <p className="text-xs sm:text-sm opacity-90">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss moderation notice"
        className="p-1 rounded-lg text-amber-700 dark:text-amber-300 hover:bg-amber-200/50 dark:hover:bg-amber-900/50 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    tone: "info" | "success" | "warning" | "error";
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (
      message: string,
      tone: "info" | "success" | "warning" | "error" = "info"
    ) => {
      setToast({ message, tone });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setToast(null), 4000);
    },
    []
  );

  return { toast, showToast, dismissToast: () => setToast(null) };
}

export function ToastNotification({
  toast,
  onDismiss,
}: {
  toast: {
    message: string;
    tone: "info" | "success" | "warning" | "error";
  } | null;
  onDismiss: () => void;
}) {
  if (!toast) return null;

  const toneStyles = {
    info: "border-zinc-700 bg-zinc-900 text-zinc-100 dark:border-zinc-700 dark:bg-zinc-800",
    success:
      "border-emerald-600/60 bg-emerald-950 text-emerald-100",
    warning:
      "border-amber-500/60 bg-amber-950 text-amber-100",
    error: "border-rose-500/60 bg-rose-950 text-rose-100",
  }[toast.tone];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border px-4 py-3 shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium ${toneStyles}`}
    >
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="opacity-70 hover:opacity-100 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
