"use client";

import { useState, FormEvent } from "react";
import { Bell, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { SENDY_STORE_LIST_ID } from "@/lib/store-catalog";

interface StoreDirectWaitlistProps {
  productName?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}

export default function StoreDirectWaitlist({
  productName,
  compact = false,
  tone = "light",
}: StoreDirectWaitlistProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          name: productName ? `Store Waitlist: ${productName}` : "Store Waitlist",
          list: SENDY_STORE_LIST_ID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          text: data.alreadySubscribed
            ? "You're already on the PiEEG Direct Store priority list!"
            : "Added! We'll notify you as soon as direct checkout opens on pieeg.com.",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          text: data.error || "Could not join waitlist. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = tone === "dark";

  return (
    <div
      className={
        compact
          ? `rounded-2xl p-4 border ${
              isDark
                ? "bg-white/4 border-white/10 text-zinc-200"
                : "bg-zinc-50/90 dark:bg-zinc-900/70 border-zinc-200/80 dark:border-zinc-800"
            }`
          : `rounded-3xl p-6 sm:p-8 border ${
              isDark
                ? "bg-white/4 border-white/10 text-zinc-100"
                : "bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-violet-500/5 dark:from-cyan-500/10 dark:via-blue-500/5 dark:to-violet-500/10 border-cyan-500/20 dark:border-cyan-500/20"
            }`
      }
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
              : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
          }`}
        >
          <Bell className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? "text-cyan-400" : "text-cyan-700 dark:text-cyan-300"
              }`}
            >
              Direct Store Priority Waitlist
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/25">
              <Sparkles className="w-2.5 h-2.5" />
              Launching Soon
            </span>
          </div>
          <p
            className={`text-xs mt-1 leading-relaxed ${
              isDark ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {productName
              ? `Want to buy ${productName} directly on pieeg.com? Get notified first when direct checkout, express warehouse dispatch, and launch perks go live.`
              : "Get notified first when direct checkout on pieeg.com goes live with express shipping, instant academic invoicing, and launch member perks."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`store-waitlist-${productName ?? "global"}`} className="sr-only">
          Email address for PiEEG Direct Store launch notification
        </label>
        <input
          id={`store-waitlist-${productName ?? "global"}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your email for direct store launch..."
          className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 ${
            isDark
              ? "bg-zinc-900/90 border-white/15 text-white placeholder:text-zinc-500"
              : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          }`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs sm:text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Joining...
            </>
          ) : (
            "Notify Me"
          )}
        </button>
      </form>

      {status && (
        <div
          role="status"
          className={`mt-2.5 flex items-center gap-1.5 text-xs font-medium ${
            status.type === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {status.type === "success" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
          <span>{status.text}</span>
        </div>
      )}
    </div>
  );
}
