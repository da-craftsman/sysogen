"use client";

import { useState } from "react";
import { ArrowRight, AlertCircle, Loader2, MailCheck } from "lucide-react";
import {
  WAITLIST_PRODUCTS,
  COMPANY_SIZES,
  NOTE_MAX_CHARS,
  type WaitlistProduct,
} from "./options";

const labelClass =
  "block text-[12px] font-mono-custom text-(--ink-mute) tracking-widest uppercase mb-1.5";
const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-(--border) bg-(--background) text-(--foreground) text-sm focus:outline-none focus:border-(--accent) transition-colors";

/**
 * Waitlist sign-up form, used everywhere the site offers the waitlist.
 * Posts to /api/waitlist, which adds the person to MailerLite.
 * `preselect` ticks the product the page is about.
 */
export function WaitlistForm({ preselect }: { preselect?: WaitlistProduct }) {
  const [products, setProducts] = useState<WaitlistProduct[]>(preselect ? [preselect] : []);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [noteLength, setNoteLength] = useState(0);

  function toggleProduct(id: WaitlistProduct) {
    setProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (products.length === 0) {
      setError("Please choose at least one product.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email,
          company: data.get("company"),
          role: data.get("role"),
          companySize: data.get("companySize"),
          note: data.get("note"),
          products,
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again, or email hello@sysogen.com.");
        setStatus("idle");
        return;
      }
      setSentTo(email);
      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again, or email hello@sysogen.com.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-3 py-4" role="status">
        <MailCheck className="w-9 h-9 text-(--accent)" strokeWidth={1.5} />
        <p className="text-(--foreground) font-semibold text-[17px]">Check your inbox.</p>
        <p className="text-(--muted) text-sm leading-[1.6] max-w-sm">
          We&apos;ve sent a confirmation link to{" "}
          <span className="text-(--foreground) font-medium break-all">{sentTo}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wl-name" className={labelClass}>Full name *</label>
          <input id="wl-name" name="name" type="text" required maxLength={120} autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="wl-email" className={labelClass}>Email *</label>
          <input id="wl-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="wl-company" className={labelClass}>Company</label>
          <input id="wl-company" name="company" type="text" maxLength={120} autoComplete="organization" className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="wl-role" className={labelClass}>Role</label>
          <input id="wl-role" name="role" type="text" maxLength={120} autoComplete="organization-title" className={inputClass} placeholder="e.g. Proposal manager" />
        </div>
      </div>

      <div>
        <label htmlFor="wl-size" className={labelClass}>Company size</label>
        <select id="wl-size" name="companySize" defaultValue="" className={inputClass}>
          <option value="">Select</option>
          {COMPANY_SIZES.map((s) => (
            <option key={s} value={s}>
              {s} people
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>Products *</legend>
        <div className="flex flex-wrap gap-2 mt-1">
          {WAITLIST_PRODUCTS.map((p) => {
            const on = products.includes(p.id);
            return (
              <label
                key={p.id}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                  on
                    ? "border-(--accent) bg-(--accent)/10 text-(--foreground)"
                    : "border-(--border-strong) text-(--ink-dim) hover:text-(--foreground)"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleProduct(p.id)}
                  className="w-4 h-4 accent-(--accent)"
                />
                {p.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="wl-note" className={labelClass}>Anything you&apos;d like us to know?</label>
        <textarea
          id="wl-note"
          name="note"
          rows={3}
          maxLength={NOTE_MAX_CHARS}
          onChange={(e) => setNoteLength(e.target.value.length)}
          className={`${inputClass} resize-y`}
          placeholder="Optional"
        />
        <div className="mt-1 text-right font-mono-custom text-[11px] text-(--ink-mute)">
          {noteLength} / {NOTE_MAX_CHARS}
        </div>
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[13px] text-(--muted) leading-[1.55] cursor-pointer">
        <input type="checkbox" name="consent" required className="mt-0.5 w-4 h-4 shrink-0 accent-(--accent)" />
        <span>
          I agree to receive emails from Sysogen about the products I selected. I can unsubscribe at any
          time. *
        </span>
      </label>

      {error && (
        <div className="flex items-center gap-2 text-(--danger) text-sm" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Joining…
          </>
        ) : (
          <>
            Join the waitlist
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
