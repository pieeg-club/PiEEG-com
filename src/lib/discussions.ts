export type DiscussionCategory =
  | "general"
  | "hardware"
  | "software"
  | "projects"
  | "help"
  | "announcements";

export type DiscussionSort = "active" | "top" | "latest" | "unanswered";

export interface DiscussionAuthor {
  id: string;
  name: string;
  role: "user" | "admin";
  badge: string;
}

export interface DiscussionThread {
  id: string;
  authorId: string;
  author: DiscussionAuthor;
  title: string;
  body: string;
  bodyPreview?: string;
  category: DiscussionCategory;
  tags: string[];
  upvotes: number;
  downvotes: number;
  score: number;
  replyCount: number;
  viewCount: number;
  acceptedReplyId: string | null;
  isPinned: boolean;
  isLocked: boolean;
  hidden: boolean;
  moderationStatus: "approved" | "flagged" | "rejected";
  myVote: 1 | -1 | 0;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionReply {
  id: string;
  threadId: string;
  authorId: string;
  author: DiscussionAuthor;
  parentId: string | null;
  body: string;
  upvotes: number;
  downvotes: number;
  score: number;
  isAccepted: boolean;
  hidden: boolean;
  moderationStatus: "approved" | "flagged" | "rejected";
  myVote: 1 | -1 | 0;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionsListResponse {
  results: DiscussionThread[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  categories?: DiscussionCategory[];
}

export interface DiscussionDetailResponse {
  thread: DiscussionThread;
  replies: DiscussionReply[];
}

export interface CreateThreadPayload {
  title: string;
  body: string;
  category: DiscussionCategory;
  tags: string[];
}

export interface UpdateThreadPayload {
  title?: string;
  body?: string;
  category?: DiscussionCategory;
  tags?: string[];
}

export interface CreateThreadResponse {
  status: string;
  moderationHold: boolean;
  message: string;
  thread: DiscussionThread;
}

export interface CreateReplyResponse {
  status: string;
  moderationHold: boolean;
  message: string;
  reply: DiscussionReply;
}

export interface VoteResponse {
  status: string;
  targetType: "thread" | "reply";
  targetId: string;
  upvotes: number;
  downvotes: number;
  score: number;
  myVote: 1 | -1 | 0;
}

export interface AcceptReplyResponse {
  status: string;
  acceptedReplyId: string | null;
  thread: DiscussionThread;
}

export interface ReportResponse {
  status: string;
  reported: boolean;
  reportCount: number;
}

export interface CurrentAuthUser {
  id: string;
  email: string | null;
  name?: string | null;
  role: "user" | "admin";
}

export const CLOUD_API_BASE = (
  process.env.NEXT_PUBLIC_PIEEG_CLOUD_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://pieeg-cloud.fly.dev"
).replace(/\/$/, "");

export const DISCUSSIONS_API_URL = `${CLOUD_API_BASE}/v1/discussions`;
export const AUTH_OTP_REQUEST_URL = `${CLOUD_API_BASE}/v1/octopus-likes/request-code`;
export const AUTH_OTP_VERIFY_URL = `${CLOUD_API_BASE}/v1/octopus-likes/verify-code`;
export const AUTH_REFRESH_URL = `${CLOUD_API_BASE}/v1/auth/refresh`;

// Shared localStorage keys with OctopusMakerProjects so verifying once works across Community pages
export const LS_TOKEN_KEY = "octopus16-auth-token";
export const LS_REFRESH_KEY = "octopus16-refresh-token";
export const LS_EMAIL_KEY = "octopus16-auth-email";
export const LS_USER_KEY = "pieeg-discussions-user";

export const DISCUSSION_CATEGORIES: {
  id: DiscussionCategory;
  label: string;
  description: string;
  pillClass: string;
}[] = [
  {
    id: "general",
    label: "General",
    description: "Neurotech discussions, BCI concepts & community chat",
    pillClass:
      "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700",
  },
  {
    id: "hardware",
    label: "Hardware",
    description: "PiEEG-8/16, Octopus-16, IronBCI, ADS1299, electrodes & noise",
    pillClass:
      "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/80",
  },
  {
    id: "software",
    label: "Software",
    description: "Python/JS SDKs, PiEEG Server, DSP filters, LSL & Cloud",
    pillClass:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800/80",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Community builds, robotics, SSVEP/P300 demos & research",
    pillClass:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/80",
  },
  {
    id: "help",
    label: "Help & Q&A",
    description: "Setup troubleshooting, SPI/BLE pairing & signal quality",
    pillClass:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/80",
  },
  {
    id: "announcements",
    label: "Announcements",
    description: "Official releases, firmware updates, live streams & grants",
    pillClass:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/80",
  },
];

export const SUGGESTED_TAGS = [
  "pieeg-8",
  "pieeg-16",
  "octopus-16",
  "ironbci",
  "ironbci-32",
  "ardeeg",
  "ads1299",
  "python",
  "dsp",
  "noise",
  "ble",
  "raspberry-pi",
  "ssvep",
  "electrodes",
];

export function getCategoryMeta(category: DiscussionCategory) {
  return (
    DISCUSSION_CATEGORIES.find((c) => c.id === category) ??
    DISCUSSION_CATEGORIES[0]
  );
}

const CORE_TEAM_BADGES = new Set([
  "founder & lead engineer",
  "co-founder & software architect",
  "core team",
]);

export function isCoreTeamAuthor(author: DiscussionAuthor): boolean {
  if (author.role === "admin") return true;
  const normalized = (author.badge || "").trim().toLowerCase();
  return CORE_TEAM_BADGES.has(normalized);
}

export function isContributorBadge(badge: string): boolean {
  const normalized = (badge || "").trim().toLowerCase();
  return normalized.includes("contributor") || normalized.includes("moderator");
}

export function decodeJwtPayload(
  token: string
): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(
            Array.from(window.atob(padded))
              .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
              .join("")
          )
        : Buffer.from(padded, "base64").toString("utf8");
    const parsed = JSON.parse(json);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function deriveCurrentUser(
  token: string | null,
  email?: string | null,
  storedUser?: Partial<CurrentAuthUser> | null
): CurrentAuthUser | null {
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  const sub =
    (typeof payload?.sub === "string" && payload.sub) ||
    (typeof payload?.userId === "string" && payload.userId) ||
    (typeof payload?.id === "string" && payload.id) ||
    storedUser?.id ||
    "";
  if (!sub) return null;

  const role =
    payload?.role === "admin" || storedUser?.role === "admin"
      ? "admin"
      : "user";

  return {
    id: sub,
    email:
      email ||
      (typeof payload?.email === "string" ? payload.email : null) ||
      storedUser?.email ||
      null,
    name:
      (typeof payload?.name === "string" ? payload.name : null) ||
      storedUser?.name ||
      null,
    role,
  };
}

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSeconds < 45) return "just now";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

export function formatFullDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name: string): string {
  const parts = (name || "U")
    .replace(/\([^)]*\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export class DiscussionsApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "DiscussionsApiError";
    this.status = status;
  }
}

export async function parseApiError(res: Response): Promise<DiscussionsApiError> {
  if (res.status === 429) {
    return new DiscussionsApiError(
      "Rate limit reached (max 15 actions per 10 minutes). Please wait a moment and try again.",
      429
    );
  }
  const data = await res.json().catch(() => null);
  const message =
    (data && typeof data.message === "string" && data.message) ||
    (data && typeof data.error === "string" && data.error) ||
    (res.status === 401
      ? "Please verify your email to continue."
      : res.status === 403
        ? "You do not have permission to perform this action (or this thread is locked)."
        : res.status === 404
          ? "Discussion not found."
          : `Request failed (${res.status})`);
  return new DiscussionsApiError(message, res.status);
}

/**
 * Server-safe fetch for initial SSR / SEO metadata. Returns null on network failure.
 */
export async function fetchServerDiscussions(params?: {
  category?: string;
  tag?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<DiscussionsListResponse | null> {
  try {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== "all") {
      qs.set("category", params.category);
    }
    if (params?.tag) qs.set("tag", params.tag);
    if (params?.search) qs.set("search", params.search);
    if (params?.sort) qs.set("sort", params.sort);
    qs.set("page", String(params?.page ?? 1));
    qs.set("limit", String(params?.limit ?? 20));

    const res = await fetch(`${DISCUSSIONS_API_URL}?${qs.toString()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6_000),
    });
    if (!res.ok) return null;
    return (await res.json()) as DiscussionsListResponse;
  } catch {
    return null;
  }
}

export async function fetchServerThread(
  threadId: string
): Promise<DiscussionDetailResponse | null> {
  try {
    const res = await fetch(
      `${DISCUSSIONS_API_URL}/${encodeURIComponent(threadId)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(6_000),
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as DiscussionDetailResponse;
  } catch {
    return null;
  }
}
