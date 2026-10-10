"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import type { Editor } from "@tiptap/react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { RichTextEditor, type RichTextValue } from "./RichTextEditor";

type Status = "idle" | "sending" | "success" | "error";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const INTERESTS = [
  "RFP OS",
  "ProveStack",
  "AI automation project",
  "Production engineering",
  "AI adoption & governance",
  "Something else",
];

const labelClass =
  "block text-[12px] font-mono-custom text-(--ink-mute) tracking-widest uppercase mb-1.5";
const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-(--border) bg-(--background) text-(--foreground) text-sm focus:outline-none focus:border-(--accent) transition-colors";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(details: [string, string][], messageHtml: string): string {
  const rows = details
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#111827">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return (
    `<table style="border-collapse:collapse;font:14px/1.5 sans-serif;margin-bottom:20px">${rows}</table>` +
    `<div style="font:14px/1.6 sans-serif;color:#111827">${messageHtml}</div>`
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<RichTextValue>({ html: "", text: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [messageError, setMessageError] = useState(false);

  function toggleInterest(value: string) {
    setInterests((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!message.text) {
      setMessageError(true);
      editorRef.current?.commands.focus();
      return;
    }

    const data = new FormData(formRef.current);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const name = field("name");
    const email = field("email");
    const company = field("company");
    const source = field("source");
    const interestsText = interests.length ? interests.join(", ") : "None selected";

    const details: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Company", company || "Not given"],
      ["Interests", interestsText],
      ["How they heard about us", source || "Not given"],
    ];
    const plainText =
      details.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\n" + message.text;

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          email,
          reply_to: email,
          company,
          source,
          interests: interestsText,
          message: message.text,
          message_text: plainText,
          message_html: buildEmailHtml(details, message.html),
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      formRef.current.reset();
      editorRef.current?.commands.clearContent(true);
      setMessage({ html: "", text: "" });
      setInterests([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <p className="text-(--foreground) font-semibold text-[17px]">Message sent.</p>
        <p className="text-(--muted) text-sm max-w-xs">
          We&apos;ll be back in touch within one business day.
        </p>
        <button
          type="button"
          className="mt-2 text-sm text-(--accent) underline underline-offset-4"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input type="text" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass}>Work email</label>
          <input type="email" name="email" required className={inputClass} placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Company</label>
        <input type="text" name="company" className={inputClass} placeholder="Company name" />
      </div>

      <fieldset>
        <legend className={labelClass}>
          What are you interested in? <span className="normal-case tracking-normal">(optional)</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mt-1">
          {INTERESTS.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 text-sm text-(--foreground) cursor-pointer">
              <input
                type="checkbox"
                checked={interests.includes(opt)}
                onChange={() => toggleInterest(opt)}
                className="w-4 h-4 accent-(--accent)"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClass}>What do you want to automate?</label>
        <RichTextEditor
          placeholder="Describe the process, pick a template, or type / for commands..."
          interests={interests}
          onReady={(ed) => (editorRef.current = ed)}
          onChange={(value) => {
            setMessage(value);
            if (value.text) setMessageError(false);
          }}
        />
        {messageError && (
          <p className="mt-1.5 text-[12px] text-(--danger)">Please tell us a little about what you want to automate.</p>
        )}
      </div>
      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <input type="text" name="source" className={inputClass} placeholder="LinkedIn, referral, Google, etc." />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or email us directly.
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
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
