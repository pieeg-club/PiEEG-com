"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import "./octopus-projects.css";

/* =====================================================================
   EDIT HERE  ·  Octopus 16 Maker Projects: introductions and progress
   CURRENT_STAGE: 0 boards shipped · 1 makers & ideas · 2 month-1 progress · 3 likes continue · 4 final results
   To add the month-1 progress for a maker, fill in their `progress` object
   (date, headline, text, optional image / video / links). Cards and dialogs update automatically.
   ===================================================================== */
const CURRENT_STAGE = 1;
const UPDATE_WHEN = "early December 2026"; // when the month-1 progress reports go live
const CLOSES = ""; // e.g. "31 January 2027"; leave "" until decided
const LIKES_OPEN = true; // set false to freeze likes and show the final result
const FINAL = false; // set true when you publish the final results

const STAGES = [
  "Boards shipped",
  "Makers & ideas",
  "Month 1 progress",
  "Likes continue",
  "Final results",
];

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectProgress {
  date: string;
  headline?: string;
  text?: string;
  image?: string;
  video?: string;
  links?: ProjectLink[];
}

export interface MakerProject {
  id: string;
  slot: number;
  title: string;
  author: string;
  pitch: string;
  image: string;
  imagePos?: string;
  imageNote?: string;
  containMedia?: boolean;
  idea: string;
  description: string;
  why: string;
  tags: string[];
  links: ProjectLink[];
  progress: ProjectProgress | null;
}

const PROJECTS: MakerProject[] = [
  {
    id: "neurogear",
    slot: 1,
    title: "NeuroGEAR",
    author: "Dr. Jaime Andrés Rincón Arango",
    pitch:
      "From neural intent to autonomous robotic action: choose an object with your brain, and an AI-driven robot arm picks it up.",
    image: "/community/octopus-challenge/jaime.jpg",
    imagePos: "center 40%",
    idea: "The human decides what the robot should do through brain signals, while AI works out how to do it. A user looks at several objects on a screen. Octopus 16 records the EEG response (SSVEP or P300) and a brain-computer interface decoder works out which object the user selected.",
    description:
      "The GEAR system combines a vision-language model with Intel RealSense RGB-D perception to find the objects and their 3D positions. Once the selection is confirmed, GEAR plans a safe trajectory and the JSO-800 robot arm picks up the chosen object. The first demo selects between two or three objects in a real pick-and-place task. The team will measure EEG signal quality, selection accuracy, response time and task success. The goal: wearable, hands-free robotic assistance, especially for people with limited mobility.",
    why: "Octopus 16 puts 16 EEG channels in a small, coin-sized wireless sensor. The team wants to find out whether such a compact, high-density array is reliable enough to control autonomous robots.",
    tags: ["EEG", "SSVEP / P300", "Robotics", "AI"],
    links: [
      { label: "Hackster.io", url: "https://www.hackster.io/jarain78" },
      { label: "GitHub", url: "https://github.com/jarain78" },
    ],
    progress: null,
  },
  {
    id: "do-you-like-jazz",
    slot: 2,
    title: "Do you like jazz?",
    author: "Jonah Golder & Dylan Deshler",
    pitch: "Listen and respond to your body's electrical signals through music.",
    image: "/community/octopus-challenge/jonah.jpg",
    imagePos: "center 25%",
    idea: "The body produces and transmits millions of electrical signals every second, and music engages many parts of the brain at once. The team has a generative model that turns data into music. With Octopus 16, they will turn the body's signals into sound in real time.",
    description:
      "The question they want to answer: how much can a person change their own physiology by listening to music created from their own electrical signals? They will build the full loop on one signal first, then record from several places on the body to match the brain's response with what the heart and muscles are doing at the same moment.",
    why: "",
    tags: ["EEG", "ECG / EMG", "Music", "Generative AI"],
    links: [
      {
        label: "Neural Music Generator",
        url: "https://huggingface.co/spaces/ddeshler/Neural_Music_Generator",
      },
      {
        label: "Jonah on LinkedIn",
        url: "https://www.linkedin.com/in/jonahgolder/",
      },
      {
        label: "Dylan on LinkedIn",
        url: "https://www.linkedin.com/in/dylan-deshler",
      },
      { label: "jonahgolder.com", url: "http://www.jonahgolder.com/" },
    ],
    progress: null,
  },
  {
    id: "octospell-octogame",
    slot: 3,
    title: "OctoSpell & OctoGame",
    author: "Hanneke Scheppink",
    pitch:
      "Spell with your brain in seconds, and challenge a friend to hands-free brain games.",
    image: "/community/octopus-challenge/hanneke.jpg",
    imagePos: "center 30%",
    idea: "OctoSpell: put Octopus 16 on a headband, connect it to a tablet or laptop, and start spelling, with no tedious setup and little or no calibration. OctoGame: challenge friends to hands-free duels in Tic-Tac-Toe, Dots and Boxes, Connect 4 or Rock-Paper-Scissors, using only your brain.",
    description:
      "Both use flickering visual stimulation. OctoSpell uses c-VEP: special flicker sequences create strong responses over the visual cortex that Octopus 16 can pick up, so the system learns the user's brain response quickly and gives immediate control. OctoGame uses SSVEP or c-VEP to decode where each player is looking and turn it into a game move. With two Octopus 16 boards running at the same time, two players play the same game with no controller or keyboard.",
    why: "",
    tags: ["c-VEP", "SSVEP", "Communication", "Games"],
    links: [
      { label: "hanneke.me", url: "https://hanneke.me/" },
      { label: "GitHub", url: "https://github.com/Hanneke-Scheppink" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/hanneke-scheppink",
      },
    ],
    progress: null,
  },
  {
    id: "fpv-rover",
    slot: 4,
    title: "Brain-Driven FPV Rover",
    author: "Qasim Iqbal",
    pitch:
      "Steer a rover hands-free: live video in AR glasses, with EEG-based controls.",
    image: "/community/octopus-challenge/octopus.jpg",
    imagePos: "center",
    imageNote: "Photos coming with the build",
    containMedia: true,
    idea: "A hands-free FPV (first-person view) teleoperation system. Live video from a rover streams to AR glasses, with flickering SSVEP targets overlaid on the view. Looking at a target sends a steering command, read by Octopus 16.",
    description: "",
    why: "",
    tags: ["SSVEP", "AR glasses", "Robotics", "Teleoperation"],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/qasimiqbal786" },
    ],
    progress: null,
  },
  {
    id: "eeg-drone",
    slot: 5,
    title: "Mind-Guided Drone View",
    author: "Polina Lekhnitskaia",
    pitch:
      "Walk around with a drone above you, see its live view in your glasses, and move it with EEG signals.",
    image: "/community/octopus-challenge/polina.jpg",
    imagePos: "center 35%",
    idea: "Pair Octopus 16 with Viture Pro 2 AR glasses, a mini PC and a drone. The drone streams its live video straight to the glasses, and the user moves it using EEG signals read by Octopus 16.",
    description: "",
    why: "",
    tags: ["EEG", "AR glasses", "Drones"],
    links: [],
    progress: null,
  },
];

/* ---------- LIKES BACKEND ----------
   Connected to PiEEG Cloud REST API (https://pieeg-cloud.fly.dev/v1/octopus-likes).
   Uses passwordless 6-digit email OTP verification so every visitor can like projects
   once per verified email, with automatic JWT refresh. */
const CLOUD_API =
  process.env.NEXT_PUBLIC_PIEEG_CLOUD_URL || "https://pieeg-cloud.fly.dev";
const LIKES_URL = `${CLOUD_API}/v1/octopus-likes`;
const REFRESH_URL = `${CLOUD_API}/v1/auth/refresh`;

const LS_KEY = "octopus16-challenge-likes";
const LS_TOKEN_KEY = "octopus16-auth-token";
const LS_REFRESH_KEY = "octopus16-refresh-token";
const LS_EMAIL_KEY = "octopus16-auth-email";

function plural(n: number, w: string) {
  return `${n} ${w}${n === 1 ? "" : "s"}`;
}

function fmtDate(d: string) {
  const x = new Date(d + "T00:00:00");
  return isNaN(x.getTime())
    ? d
    : x.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 5 6.4 5c2 0 3.6 1.1 4.6 2.6l1 1.4 1-1.4C14 6.1 15.6 5 17.6 5 21 5 23.1 8.5 21.6 11.8 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="M16 6l-4-4-4 4M12 2v14" />
    </svg>
  );
}

export default function OctopusMakerProjects() {
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [shared, setShared] = useState(false);
  const [sortMode, setSortMode] = useState<"slot" | "votes">("slot");
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Auth / OTP state for voting
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [pendingProject, setPendingProject] = useState<MakerProject | null>(
    null
  );
  const [authStep, setAuthStep] = useState<"email" | "otp">("email");
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const authDialogRef = useRef<HTMLDialogElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 2200);
  }, []);

  const saveLikedSet = useCallback((nextSet: Set<string>) => {
    setMine(nextSet);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify([...nextSet]));
    } catch {
      // ignore storage errors
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem(LS_REFRESH_KEY);
      if (!refreshToken) return null;
      const r = await fetch(REFRESH_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!r.ok) {
        localStorage.removeItem(LS_TOKEN_KEY);
        localStorage.removeItem(LS_REFRESH_KEY);
        setToken(null);
        return null;
      }
      const j = await r.json();
      const newAccess = j?.access?.token;
      const newRefresh = j?.refresh?.token;
      if (newAccess) {
        localStorage.setItem(LS_TOKEN_KEY, newAccess);
        if (newRefresh) localStorage.setItem(LS_REFRESH_KEY, newRefresh);
        setToken(newAccess);
        return newAccess;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Load visitor's liked project IDs + auth token from localStorage and fetch shared counts
  useEffect(() => {
    let savedToken: string | null = null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setMine(new Set(parsed));
        }
      }
      savedToken = localStorage.getItem(LS_TOKEN_KEY);
      const savedEmail = localStorage.getItem(LS_EMAIL_KEY);
      if (savedToken) setToken(savedToken);
      if (savedEmail) {
        setUserEmail(savedEmail);
        setEmailInput(savedEmail);
      }
    } catch {
      // ignore storage errors
    }

    const loadInitialSnapshot = async () => {
      try {
        const headers: Record<string, string> = {};
        if (savedToken) headers["Authorization"] = `Bearer ${savedToken}`;
        let r = await fetch(LIKES_URL, { headers, cache: "no-store" });
        if (!r.ok) throw new Error("Failed to fetch likes");
        let j = await r.json();

        // If we had a saved token but it expired, try refreshing once
        if (savedToken && !j.authenticated) {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            r = await fetch(LIKES_URL, {
              headers: { Authorization: `Bearer ${refreshed}` },
              cache: "no-store",
            });
            if (r.ok) j = await r.json();
          }
        }

        if (j && typeof j.counts === "object") {
          setCounts(j.counts);
          setShared(true);
          if (j.authenticated && Array.isArray(j.liked)) {
            saveLikedSet(new Set(j.liked));
            if (j.email) setUserEmail(j.email);
          }
        }
      } catch {
        setShared(false);
      }
    };

    loadInitialSnapshot();

    // Deep-link support via URL hash
    const deep = window.location.hash.slice(1);
    if (PROJECTS.some((p) => p.id === deep)) {
      setActiveStoryId(deep);
    }
  }, [refreshAccessToken, saveLikedSet]);

  // Sync story dialog open/close state with activeStoryId
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (activeStoryId) {
      if (!d.open) d.showModal();
      window.history.replaceState(null, "", "#" + activeStoryId);
    } else {
      if (d.open) d.close();
    }
  }, [activeStoryId]);

  // Sync auth dialog open/close state with pendingProject
  useEffect(() => {
    const d = authDialogRef.current;
    if (!d) return;
    if (pendingProject) {
      if (!d.open) d.showModal();
    } else {
      if (d.open) d.close();
    }
  }, [pendingProject]);

  const closeStory = useCallback(() => {
    setActiveStoryId(null);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }, []);

  const closeAuthModal = useCallback(() => {
    setPendingProject(null);
    setAuthError(null);
    setOtpInput("");
  }, []);

  const likesOf = useCallback(
    (p: MakerProject) =>
      shared ? counts[p.id] || 0 : mine.has(p.id) ? 1 : 0,
    [shared, counts, mine]
  );

  const totalLikes = PROJECTS.reduce((acc, p) => acc + likesOf(p), 0);

  const pct = (p: MakerProject) =>
    totalLikes ? Math.round((likesOf(p) / totalLikes) * 100) : 0;

  const ranked = [...PROJECTS].sort(
    (a, b) => likesOf(b) - likesOf(a) || a.slot - b.slot
  );

  const sortedProjects = [...PROJECTS].sort((a, b) =>
    sortMode === "votes"
      ? likesOf(b) - likesOf(a) || a.slot - b.slot
      : a.slot - b.slot
  );

  const toggleLike = async (project: MakerProject) => {
    if (!LIKES_OPEN) return;

    // Require email verification before casting shared votes
    if (!token) {
      setAuthError(null);
      setAuthStep("email");
      setOtpInput("");
      setPendingProject(project);
      return;
    }

    const isLikedNow = !mine.has(project.id);
    const prevMine = new Set(mine);
    const prevCounts = { ...counts };

    const nextMine = new Set(mine);
    if (isLikedNow) {
      nextMine.add(project.id);
      if (shared) {
        setCounts((prev) => ({
          ...prev,
          [project.id]: (prev[project.id] || 0) + 1,
        }));
      }
      showToast(`You liked ${project.title}`);
    } else {
      nextMine.delete(project.id);
      if (shared) {
        setCounts((prev) => ({
          ...prev,
          [project.id]: Math.max(0, (prev[project.id] || 0) - 1),
        }));
      }
      showToast("Like removed");
    }
    saveLikedSet(nextMine);

    try {
      let activeToken: string | null = token;
      let r = await fetch(LIKES_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ id: project.id, like: isLikedNow }),
      });

      if (r.status === 401) {
        activeToken = await refreshAccessToken();
        if (activeToken) {
          r = await fetch(LIKES_URL, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${activeToken}`,
            },
            body: JSON.stringify({ id: project.id, like: isLikedNow }),
          });
        } else {
          // Session expired — revert optimistic update and prompt for email code
          saveLikedSet(prevMine);
          setCounts(prevCounts);
          setAuthError(null);
          setAuthStep("email");
          setPendingProject(project);
          return;
        }
      }

      if (!r.ok) {
        const errData = await r.json().catch(() => null);
        saveLikedSet(prevMine);
        setCounts(prevCounts);
        showToast(errData?.message || "Could not record like");
        return;
      }

      const j = await r.json();
      if (j && typeof j.counts === "object") {
        setCounts(j.counts);
        setShared(true);
      }
      if (j && Array.isArray(j.liked)) {
        saveLikedSet(new Set(j.liked));
      }
    } catch {
      saveLikedSet(prevMine);
      setCounts(prevCounts);
      showToast("Network error — please try again");
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);
    try {
      const r = await fetch(`${LIKES_URL}/request-code`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, website: honeypot }),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok) {
        setAuthError(
          j?.message || "Could not send verification code. Please try again."
        );
        return;
      }
      setAuthStep("otp");
    } catch {
      setAuthError("Network error. Please check your connection and try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim().toLowerCase();
    const trimmedOtp = otpInput.trim();
    if (trimmedOtp.length !== 6) {
      setAuthError("Please enter the 6-digit code from your email.");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);
    try {
      const r = await fetch(`${LIKES_URL}/verify-code`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          otp: trimmedOtp,
          id: pendingProject?.id,
          website: honeypot,
        }),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok) {
        setAuthError(j?.message || "Invalid or expired verification code.");
        return;
      }

      const accessToken = j?.access?.token;
      const refreshToken = j?.refresh?.token;
      if (accessToken) {
        setToken(accessToken);
        setUserEmail(trimmedEmail);
        try {
          localStorage.setItem(LS_TOKEN_KEY, accessToken);
          if (refreshToken) localStorage.setItem(LS_REFRESH_KEY, refreshToken);
          localStorage.setItem(LS_EMAIL_KEY, trimmedEmail);
        } catch {
          // ignore storage errors
        }
      }

      if (j && typeof j.counts === "object") {
        setCounts(j.counts);
        setShared(true);
      }
      if (j && Array.isArray(j.liked)) {
        saveLikedSet(new Set(j.liked));
      }

      const likedTitle = pendingProject?.title;
      closeAuthModal();
      if (likedTitle) {
        showToast(`You liked ${likedTitle}`);
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const shareProject = (p: MakerProject) => {
    const url = window.location.href.split("#")[0] + "#" + p.id;
    const text = `Like "${p.title}" in the PiEEG Octopus 16 Maker Projects`;
    if (navigator.share) {
      navigator.share({ title: text, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => showToast("Link copied"),
        () => {}
      );
    }
  };

  const renderLikeButton = (p: MakerProject) => {
    const on = mine.has(p.id);
    const n = likesOf(p);
    if (!LIKES_OPEN) {
      return (
        <button className="like" type="button" disabled>
          <HeartIcon />
          <span>{plural(n, "like")}</span>
        </button>
      );
    }
    return (
      <button
        className="like"
        type="button"
        aria-pressed={on}
        aria-label={`${on ? "Remove your like from" : "Like"} ${p.title}`}
        onClick={() => toggleLike(p)}
      >
        <HeartIcon />
        <span>{on ? "Liked" : "Like"}</span>
        <b>{n}</b>
      </button>
    );
  };

  const topThree = ranked.slice(0, 3);
  const maxTopLikes = Math.max(1, ...topThree.map(likesOf));
  const anyProgress = PROJECTS.some((p) => p.progress);
  const progressCount = PROJECTS.filter((p) => p.progress).length;
  const stageLabel = FINAL
    ? "Final results"
    : !LIKES_OPEN
      ? "Likes closed"
      : CURRENT_STAGE >= 2
        ? "Month 1 progress is in · likes open"
        : "Meet the makers · likes open";

  const activeProject = activeStoryId
    ? PROJECTS.find((p) => p.id === activeStoryId) || null
    : null;

  return (
    <div className="octopus-maker-page">
      {/* ── Breadcrumb ── */}
      <div className="crumbs">
        <nav aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <Link href="/community">Community</Link>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span>Octopus 16 Maker Projects</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="p-hero">
        <div className="in">
          <div>
            <div className="badge">
              <i />
              <span>{stageLabel}</span>
            </div>
            <h1>
              Octopus 16 Maker Projects
              <br />
              <em>Meet the makers</em>
            </h1>
            <p className="lede">
              We sent Octopus 16 boards to five makers around the world. Here
              are their ideas. In about one month, each maker will share their
              progress here. Follow their progress and like the projects you
              enjoy. At the end, we will share the final results.
            </p>
            <div className="chips3">
              <div>
                <small>Makers</small>
                <b>{PROJECTS.length}</b>
              </div>
              <div>
                <small>Progress update</small>
                <b>{anyProgress ? `${progressCount} of 5 in` : "~1 month"}</b>
              </div>
              <div>
                <small>Likes so far</small>
                <b>{totalLikes}</b>
              </div>
            </div>
            <div className="p-cta">
              <a className="pbtn grad" href="#results">
                <HeartIcon />
                Like a project
              </a>
              <a className="pbtn ghost" href="#standings">
                See community likes
              </a>
              <a className="p-link" href="#how">
                How it works
              </a>
            </div>
          </div>

          <div className="p-art">
            <div className="live" aria-live="polite">
              <div className="live-top">
                <small>Most liked</small>
                <span>
                  <i />
                  Live
                </span>
              </div>
              <div>
                {topThree.map((p) => {
                  const n = likesOf(p);
                  return (
                    <a key={p.id} className="live-row" href={`#${p.id}`}>
                      <span className="r">{p.slot}</span>
                      <img
                        src={p.image}
                        alt=""
                        style={{ objectPosition: p.imagePos || "center" }}
                      />
                      <span style={{ minWidth: 0 }}>
                        <b>{p.title}</b>
                        <span className="bar">
                          <i style={{ width: `${(n / maxTopLikes) * 100}%` }} />
                        </span>
                      </span>
                      <span className="v">
                        <b>{n}</b>
                        {n === 1 ? "like" : "likes"}
                      </span>
                    </a>
                  );
                })}
              </div>
              <div className="live-you">
                {mine.size > 0 ? (
                  <>
                    <span>
                      You liked <b>{plural(mine.size, "project")}</b>.
                    </span>
                    <a href="#results">See all →</a>
                  </>
                ) : (
                  <>
                    <span>
                      {totalLikes > 0
                        ? "You haven't liked a project yet."
                        : "No likes yet. Be the first!"}
                    </span>
                    <a href="#results">Like now →</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="guide">
        <div className="wrap">
          {/* ── Stage strip ── */}
          <ol className="stages" aria-label="Project progress">
            {STAGES.map((s, i) => {
              const cls =
                i < CURRENT_STAGE ? "done" : i === CURRENT_STAGE ? "now" : "";
              return (
                <li key={s} className={cls}>
                  <i>{i < CURRENT_STAGE ? "✓" : i + 1}</i>
                  <span>{s}</span>
                </li>
              );
            })}
          </ol>

          <div className="next-up">
            <span className="nu-ic" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <p>
              <b>What happens next:</b> the makers are building now.{" "}
              <span>In {UPDATE_WHEN}</span> we will add each maker&apos;s
              progress report, photos and videos to this page. Likes stay open
              the whole time, and at the end we will share the final results.
            </p>
          </div>

          {/* ── Projects ── */}
          <section className="block" id="results">
            <div className="sec-head">
              <h2>The makers</h2>
              <p>
                Each card shows the maker and their idea. Open a card to read
                the full plan. Tap the <b>heart</b> on every project you like:
                you can like as many projects as you want.
              </p>
            </div>
            <div className="toolbar">
              <div className="seg" role="group" aria-label="Sort projects">
                <button
                  type="button"
                  aria-pressed={sortMode === "slot"}
                  onClick={() => setSortMode("slot")}
                >
                  Board order
                </button>
                <button
                  type="button"
                  aria-pressed={sortMode === "votes"}
                  onClick={() => setSortMode("votes")}
                >
                  Most liked
                </button>
              </div>
              <div className="total">
                <b>{plural(totalLikes, "like")}</b> across{" "}
                {plural(sortedProjects.length, "project")}
                {userEmail ? (
                  <span className="local"> · verified as {userEmail}</span>
                ) : !shared ? (
                  <span className="local">
                    {" "}
                    · preview: shows only your likes
                  </span>
                ) : null}
              </div>
            </div>

            <div className="results">
              {sortedProjects.map((p) => (
                <article
                  key={p.id}
                  className={`rcard${mine.has(p.id) ? " mine" : ""}`}
                  id={p.id}
                >
                  <button
                    className={`rmedia${p.containMedia ? " contain" : ""}`}
                    type="button"
                    aria-label={`Open ${p.title}`}
                    onClick={() => setActiveStoryId(p.id)}
                  >
                    <img
                      src={p.image}
                      alt={p.author}
                      style={{ objectPosition: p.imagePos || "center" }}
                    />
                    <span className="rtag">
                      <span>Board {p.slot}</span>
                    </span>
                    {p.imageNote && (
                      <span className="imgnote">{p.imageNote}</span>
                    )}
                  </button>
                  <div className="rbody">
                    <h3>{p.title}</h3>
                    <p className="rby">by {p.author}</p>
                    <p className="sum">{p.pitch}</p>
                    <div className="chips">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {p.progress ? (
                      <div className="upd done">
                        <div className="label">
                          Month 1 progress · {fmtDate(p.progress.date)}
                        </div>
                        <p>
                          <b>{p.progress.headline || ""}</b>{" "}
                          {p.progress.text || ""}
                        </p>
                      </div>
                    ) : (
                      <div className="upd">
                        <div className="label">Month 1 progress</div>
                        <p>Coming {UPDATE_WHEN}.</p>
                      </div>
                    )}
                    <button
                      className="story-link"
                      type="button"
                      onClick={() => setActiveStoryId(p.id)}
                    >
                      Read the full plan →
                    </button>
                    <div className="ractions">
                      {renderLikeButton(p)}
                      <button
                        className="icon-btn"
                        type="button"
                        aria-label={`Share ${p.title}`}
                        onClick={() => shareProject(p)}
                      >
                        <ShareIcon />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── Standings ── */}
          <section className="block" id="standings">
            <div className="sec-head">
              <h2>Community likes</h2>
              <p>
                {totalLikes
                  ? `${plural(totalLikes, "like")} so far. Final results will be shared at the end${CLOSES ? ` (${CLOSES})` : ""}.`
                  : "No likes yet. Final results will be shared at the end."}
              </p>
            </div>
            <div className="stand">
              <div className="panel">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Board</th>
                      <th>Project</th>
                      <th className="hide-sm">Share</th>
                      <th style={{ textAlign: "right" }}>Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranked.map((p) => (
                      <tr
                        key={p.id}
                        className={mine.has(p.id) ? "mine" : undefined}
                      >
                        <td className="rk">{p.slot}</td>
                        <td className="nm">
                          <b>{p.title}</b>
                          <small>
                            {p.author}
                            {mine.has(p.id) ? " · you liked this" : ""}
                          </small>
                        </td>
                        <td className="hide-sm" style={{ width: "30%" }}>
                          <div className="mini">
                            <i style={{ width: `${pct(p)}%` }} />
                          </div>
                        </td>
                        <td className="num">
                          <b>{likesOf(p)}</b>
                          {totalLikes ? ` · ${pct(p)}%` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="awards">
              <div className="award">
                <div>
                  <b>Final results</b>
                  <span>Shared at the end</span>
                  <em>
                    {FINAL
                      ? "Final results are in"
                      : totalLikes &&
                          likesOf(ranked[0]) >
                            (ranked[1] ? likesOf(ranked[1]) : 0)
                        ? `Most liked so far: ${ranked[0].title}`
                        : "Likes are open"}
                  </em>
                </div>
              </div>
              <div className="award">
                <div>
                  <b>Month 1 progress</b>
                  <span>Each maker&apos;s report, photos and video</span>
                  <em>
                    {anyProgress
                      ? "Progress reports are in"
                      : `Coming ${UPDATE_WHEN}`}
                  </em>
                </div>
              </div>
              <div className="award">
                <div>
                  <b>Likes stay open</b>
                  <span>Before and after the progress updates</span>
                  <em>Like as many projects as you want</em>
                </div>
              </div>
            </div>
          </section>

          {/* ── How it works ── */}
          <section className="block" id="how">
            <div className="sec-head">
              <h2>How it works</h2>
              <p>No account, no sign-up. It takes ten seconds.</p>
            </div>
            <div className="how">
              <div className="panel">
                <div className="k">1</div>
                <h3>Meet the makers</h3>
                <p>
                  Five makers received an Octopus 16. Read each idea and open a
                  card for the full plan.
                </p>
              </div>
              <div className="panel">
                <div className="k">2</div>
                <h3>Like your favourites</h3>
                <p>
                  Tap the heart on every project you like. Tap again to remove
                  your like.
                </p>
              </div>
              <div className="panel">
                <div className="k">3</div>
                <h3>Come back in a month</h3>
                <p>
                  We will add each maker&apos;s progress. Likes stay open, and
                  at the end we will share the final results.
                </p>
              </div>
            </div>
            <div className="rules">
              <span>One like per project per visitor</span>
              <span>Like as many projects as you want</span>
              <span>Progress updates added {UPDATE_WHEN}</span>
              <span>Final results shared at the end</span>
            </div>
          </section>

          {/* ── Hardware ── */}
          <section className="block" id="hardware">
            <div className="sec-head">
              <h2>Built with Octopus 16</h2>
              <p>
                16 channels on a coin-sized board: Seeed Studio XIAO ESP32-S3,
                dual 24-bit ADS131M08 front-ends, dry pogo-pin electrodes,
                battery power and Bluetooth streaming.
              </p>
            </div>
            <div className="gallery">
              <figure className="contain">
                <img
                  src="/community/octopus-challenge/octopus-overview.jpg"
                  alt="PiEEG Octopus 16 — 16-channel wireless EEG with 24-bit resolution, dry electrodes and Bluetooth"
                />
                <figcaption>Octopus 16 overview</figcaption>
              </figure>
              <figure>
                <img
                  src="/community/octopus-challenge/xiao-mounted.jpg"
                  alt="Octopus 16 with Seeed Studio XIAO ESP32-S3 mounted"
                />
                <figcaption>XIAO ESP32-S3 mounted</figcaption>
              </figure>
              <figure>
                <img
                  src="/community/octopus-challenge/pogo-pins.jpg"
                  alt="3D-printed Octopus 16 housings with 16 gold pogo-pin dry electrodes"
                  style={{ objectPosition: "center 55%" }}
                />
                <figcaption>16 dry pogo pins</figcaption>
              </figure>
              <figure className="contain" style={{ gridColumn: "2 / 4" }}>
                <img
                  src="/community/octopus-challenge/board-pinout.jpg"
                  alt="Octopus 16 hardware diagram showing Seeed Studio XIAO ESP32-S3, status LED, power connector and 16-channel pogo-pin electrodes"
                />
                <figcaption>Hardware layout &amp; pinout</figcaption>
              </figure>
            </div>
          </section>

          {/* ── Join next round ── */}
          <section className="block" id="join">
            <div className="join">
              <div className="panel">
                <div className="label">Get involved</div>
                <h3>Want to build one too?</h3>
                <p>
                  The free boards go to makers: DIY geeks, tinkerers and
                  hobbyists. Email us your idea and you could take part in a
                  future group. Universities and labs can buy Octopus 16
                  directly.
                </p>
                <div className="cta">
                  <a
                    className="btn solid"
                    href="mailto:pieeg@pieeg.com?subject=Octopus%2016%20Maker%20Projects"
                  >
                    Email pieeg@pieeg.com
                  </a>
                  <Link className="btn" href="/hardware/octopus-16">
                    About Octopus 16
                  </Link>
                </div>
              </div>
              <div className="panel ph-panel">
                <img
                  src="/community/octopus-challenge/bodyhacker-test.jpg"
                  alt="Ildar Rakhmatulin holding Octopus 16 BodyHacker units for testing"
                />
              </div>
            </div>
          </section>

          {/* ── Compact Discord & GitHub Community Channels ── */}
          <section className="block" id="community-channels">
            <div className="sec-head">
              <h2>PiEEG community</h2>
              <p>
                Chat with builders in real time on Discord or explore our MIT
                open-source software, firmware and SDKs on GitHub.
              </p>
            </div>
            <div className="comm-links">
              <a
                className="comm-card"
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="comm-card-left">
                  <div className="comm-ic">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7zM8.3 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7.4 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Join Discord</h3>
                    <p>
                      Real-time support, maker discussions and project updates.
                    </p>
                  </div>
                </div>
                <span className="comm-arrow">Join →</span>
              </a>

              <a
                className="comm-card"
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="comm-card-left">
                  <div className="comm-ic">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
                    </svg>
                  </div>
                  <div>
                    <h3>GitHub (@pieeg-club)</h3>
                    <p>
                      17+ open-source repositories, SDKs and pieeg-server (MIT).
                    </p>
                  </div>
                </div>
                <span className="comm-arrow">Explore →</span>
              </a>
            </div>
          </section>

          <div className="notice">
            <h2>About these projects</h2>
            <div>
              <p>
                Photos, names and project ideas are shown with each maker&apos;s
                permission. Octopus 16 is not a medical device and isn&apos;t
                for diagnosis or treatment.
              </p>
              <p>
                Likes are counted once per project per visitor. We may remove
                likes that look automated. Makers can ask us anytime to change
                or remove their project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Project story modal ── */}
      <dialog
        ref={dialogRef}
        className="story"
        aria-labelledby="stTitle"
        onClose={closeStory}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeStory();
        }}
      >
        {activeProject && (
          <>
            <div className="st-head">
              <div>
                <span className="status">
                  <i />
                  Board {activeProject.slot} ·{" "}
                  {activeProject.progress
                    ? "Month 1 progress in"
                    : "Idea · building now"}
                </span>
                <h2 id="stTitle">{activeProject.title}</h2>
                <div className="meta">
                  <span>
                    by{" "}
                    <b style={{ color: "var(--text)" }}>
                      {activeProject.author}
                    </b>
                  </span>
                  {activeProject.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <button
                className="x"
                type="button"
                aria-label="Close"
                onClick={closeStory}
              >
                ×
              </button>
            </div>

            <div className="st-body">
              {activeProject.progress ? (
                <div className="st-result">
                  {activeProject.progress.video ? (
                    <div className="media">
                      <iframe
                        src={activeProject.progress.video}
                        title={`${activeProject.title} video`}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : activeProject.progress.image ? (
                    <div className="media">
                      <img src={activeProject.progress.image} alt="" />
                    </div>
                  ) : null}
                  <div>
                    <div className="label" style={{ color: "var(--st-done)" }}>
                      Month 1 progress · {fmtDate(activeProject.progress.date)}
                    </div>
                    <h4>{activeProject.progress.headline || ""}</h4>
                    <p>{activeProject.progress.text || ""}</p>
                    {activeProject.progress.links &&
                      activeProject.progress.links.length > 0 && (
                        <div className="links">
                          {activeProject.progress.links.map((l, i) => (
                            <a
                              key={l.url}
                              className={`btn${i === 0 ? " solid" : ""}`}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="empty">
                  Month 1 progress: coming {UPDATE_WHEN}. The maker is building
                  now.
                </div>
              )}

              <div className="st-cols">
                <div className="col">
                  <div>
                    <div className="label">The pitch</div>
                    <p className="pitch">{activeProject.pitch}</p>
                  </div>
                  <div>
                    <div className="label">The idea</div>
                    <p>{activeProject.idea}</p>
                  </div>
                  {activeProject.description && (
                    <div>
                      <div className="label">How it works</div>
                      <p>{activeProject.description}</p>
                    </div>
                  )}
                  {activeProject.why && (
                    <div>
                      <div className="label">Why Octopus 16</div>
                      <p>{activeProject.why}</p>
                    </div>
                  )}
                  <div className="chips">
                    {activeProject.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="col">
                  <div
                    className={`media st-photo${activeProject.containMedia ? " contain" : ""}`}
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.author}
                      style={{
                        objectPosition: activeProject.imagePos || "center",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="st-foot">
              <small>{plural(likesOf(activeProject), "like")}</small>
              {renderLikeButton(activeProject)}
            </div>
          </>
        )}
      </dialog>

      {/* ── Email OTP verification modal for voting ── */}
      <dialog
        ref={authDialogRef}
        className="auth-modal"
        aria-labelledby="authTitle"
        onClose={closeAuthModal}
        onClick={(e) => {
          if (e.target === authDialogRef.current) closeAuthModal();
        }}
      >
        {pendingProject && (
          <div className="auth-box">
            <div className="auth-top">
              <div>
                <span className="status">
                  <i />
                  Verify once to like
                </span>
                <h3 id="authTitle">
                  {authStep === "email"
                    ? `Like "${pendingProject.title}"`
                    : "Enter verification code"}
                </h3>
              </div>
              <button
                className="x"
                type="button"
                aria-label="Close"
                onClick={closeAuthModal}
              >
                ×
              </button>
            </div>

            {authStep === "email" ? (
              <>
                <p className="auth-desc">
                  To keep community likes fair and prevent automated voting,
                  enter your email for a one-time 6-digit code. You only need to
                  do this once.
                </p>
                <form className="auth-form" onSubmit={handleRequestCode}>
                  <input
                    className="auth-hp"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                  <input
                    className="auth-input"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={authLoading}
                    autoFocus
                  />
                  {authError && <p className="auth-err">{authError}</p>}
                  <div className="auth-actions">
                    <button
                      className="like"
                      type="submit"
                      disabled={authLoading}
                    >
                      {authLoading ? "Sending code…" : "Send 6-digit code"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <p className="auth-desc">
                  We sent a 6-digit code to <b>{emailInput}</b>. Enter it below
                  to confirm your like on <b>{pendingProject.title}</b>.
                </p>
                <form className="auth-form" onSubmit={handleVerifyCode}>
                  <input
                    className="auth-input otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    placeholder="000000"
                    value={otpInput}
                    onChange={(e) =>
                      setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    disabled={authLoading}
                    autoFocus
                  />
                  {authError && <p className="auth-err">{authError}</p>}
                  <div className="auth-actions">
                    <button
                      className="like"
                      type="submit"
                      disabled={authLoading || otpInput.length !== 6}
                    >
                      <HeartIcon />
                      <span>
                        {authLoading ? "Verifying…" : "Verify & Like"}
                      </span>
                    </button>
                    <button
                      className="auth-sub"
                      type="button"
                      disabled={authLoading}
                      onClick={() => {
                        setAuthStep("email");
                        setAuthError(null);
                      }}
                    >
                      Use a different email
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </dialog>

      <div
        className={`toast${toastMsg ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMsg}
      </div>
    </div>
  );
}
