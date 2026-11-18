"use client";

/**
 * IronBCI-128 subscribe form: replaces the purchase box on /store/ironbci-128.
 *
 * Every sign-up is clearly marked as IronBCI-128 in Sendy:
 *   • Name field  → "IronBCI-128 | <name> | <role>"  (always visible in the subscriber list)
 *   • Custom fields "Product" = "IronBCI-128" and "Role" (stored if the list has those fields)
 *   • List        → IRONBCI128_SENDY_LIST below. To keep IronBCI-128 sign-ups in their own list,
 *                   create a list in Sendy and paste its ID here.
 */

import { useState, type FormEvent } from "react";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";
import { SENDY_STORE_LIST_ID } from "@/lib/store-catalog";

const PRODUCT = "IronBCI-128";
const IRONBCI128_SENDY_LIST = SENDY_STORE_LIST_ID;

const ROLES = ["Researcher", "Developer", "Educator / student", "Hobbyist / maker", "Company", "Other"];

export default function IronBCI128Subscribe() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!consent) {
      setStatus({ type: "error", text: "Please tick the box to agree to receive IronBCI-128 emails." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          name: [PRODUCT, name.trim() || "—", role || "—"].join(" | "),
          list: IRONBCI128_SENDY_LIST,
          product: PRODUCT,
          role,
          hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({
          type: "success",
          text: data.alreadySubscribed
            ? "You're already subscribed. We'll email you when IronBCI-128 is ready to order."
            : "Thanks! You're subscribed to IronBCI-128 news. We'll email you the moment it's ready to order.",
        });
        setEmail("");
        setName("");
        setRole("");
        setConsent(false);
      } else {
        setStatus({ type: "error", text: data.error || "Could not subscribe. Please try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50";

  return (
    <div
      id="subscribe"
      className="scroll-mt-32 rounded-3xl border-2 border-amber-500/30 bg-linear-to-br from-amber-500/5 via-orange-500/5 to-transparent dark:from-amber-500/10 p-5 sm:p-6 space-y-4 shadow-lg shadow-zinc-900/5"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Bell className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Subscribe for IronBCI-128
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
            Be the first to know when IronBCI-128 is ready to order. Specs, pricing and the order date go to subscribers first.
          </p>
        </div>
      </div>

      {status?.type === "success" ? (
        <div
          role="status"
          className="flex items-start gap-2.5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-sm text-emerald-800 dark:text-emerald-200"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{status.text}</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <div>
            <label htmlFor="irb128-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Email <span className="text-amber-600">*</span>
            </label>
            <input
              id="irb128-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="you@university.edu"
              className={field}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="irb128-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Name <span className="font-normal text-zinc-400">(optional)</span>
              </label>
              <input
                id="irb128-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="Your name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="irb128-role" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                I am a… <span className="font-normal text-zinc-400">(optional)</span>
              </label>
              <select
                id="irb128-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className={field}
              >
                <option value="">Choose one</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Honeypot: hidden from people, bots fill it in */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <label className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={loading}
              className="mt-0.5 w-4 h-4 accent-amber-600 shrink-0"
            />
            <span>
              I agree to receive emails from PiEEG about IronBCI-128. Unsubscribe any time.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold text-base shadow-xl hover:opacity-95 transition-opacity disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bell className="w-5 h-5" />}
            {loading ? "Subscribing…" : "Notify me about IronBCI-128"}
          </button>

          {status?.type === "error" && (
            <p role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400">
              {status.text}
            </p>
          )}
          <p className="text-[11px] text-zinc-400">
            One email when it&apos;s ready — no spam. IronBCI-128 is in development; specifications may change.
          </p>
        </form>
      )}
    </div>
  );
}
