"use client";

import { AnimateIn } from "@/components/AnimateIn";
import { useTheme } from "@/components/ThemeProvider";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight, Mail } from "lucide-react";

const facts = [
  ["Response time", "Within one business day"],
  ["First call", "Free, 30 minutes"],
  ["Engagement length", "6–16 weeks typical"],
  ["Time zones", "Remote, worldwide"],
];

export function CTA() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section id="contact" className="relative py-14 lg:py-24">
      <div className="site-container">
        <AnimateIn>
          <div
            className="relative overflow-hidden rounded-[22px] border border-(--border-strong)"
            style={{
              padding: "clamp(40px,8vw,96px) clamp(28px,6vw,80px)",
              background: isDark
                ? "radial-gradient(700px 500px at 80% 20%,rgba(79,140,255,0.18),transparent 60%)," +
                  "radial-gradient(500px 400px at 10% 90%,rgba(34,211,238,0.12),transparent 60%)," +
                  "linear-gradient(135deg,rgba(11,16,32,0.9),rgba(7,9,15,0.9))"
                : "radial-gradient(700px 500px at 80% 20%,rgba(79,140,255,0.1),transparent 60%)," +
                  "radial-gradient(500px 400px at 10% 90%,rgba(34,211,238,0.08),transparent 60%)," +
                  "linear-gradient(135deg,var(--bg-2),var(--card))",
            }}
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 opacity-50 pointer-events-none"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>

            <div className="relative max-w-190">
              <span className="eyebrow" style={{ color: "var(--accent-2)" }}>Let&apos;s talk</span>
              <h2 className="mt-5 mb-5 font-bold leading-[1.05] text-(--foreground) text-[clamp(32px,5vw,64px)] tracking-tight">
                Tell us what you
                <br />
                <span className="gradient-text-blue">want to automate.</span>
              </h2>
              <p className="text-(--muted) leading-[1.55] mb-10 text-[clamp(15px,1.5vw,17px)] max-w-140">
                Book a 30-minute call. We&apos;ll listen, ask questions, and tell you honestly
                whether we&apos;re the right fit. No slides.
              </p>

              <div className="flex flex-wrap gap-3.5 items-center">
                <CalendlyButton className="btn-primary">
                  Book a discovery call
                  <ArrowRight className="w-4 h-4" />
                </CalendlyButton>
                <a
                  href="mailto:hello@sysogen.com"
                  className="inline-flex items-center gap-2 text-sm text-(--ink-dim) hover:text-(--foreground) transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Or email{" "}
                  <span className={`text-(--foreground) underline underline-offset-4 ${isDark ? "decoration-white/20" : "decoration-black/20"}`}>
                    hello@sysogen.com
                  </span>
                </a>
              </div>

              <div className="mt-14 pt-8 border-t border-(--border) grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono-custom text-[10px] text-(--ink-mute) tracking-[0.12em] uppercase mb-1.5">
                      {k}
                    </div>
                    <div className="text-[15px] text-(--foreground) font-medium">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
