"use client";

import { AnimateIn, StaggerContainer, staggerItem } from "@/components/AnimateIn";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "We map your processes, systems and current AI use, then find the work most worth automating first.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "A prioritized roadmap aligned with business goals. No 200-page decks. Actionable plans with clear milestones.",
  },
  {
    n: "03",
    title: "Engineering",
    body: "We embed with your team and build. Production-grade systems, not prototypes. We ship code, not slides.",
  },
  {
    n: "04",
    title: "Handover",
    body: "We transfer knowledge, document the systems, and pair-program until your team owns it. You inherit a codebase, not a dependency.",
  },
];

export function Engagement() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section
      id="approach"
      className="relative py-4 lg:py-20"
      style={{
        background: isDark
          ? "linear-gradient(180deg,transparent,rgba(11,16,32,0.5) 30%,rgba(11,16,32,0.5) 70%,transparent)"
          : "radial-gradient(900px 600px at 92% 65%,rgba(212,150,42,0.09),transparent 65%)," +
            "radial-gradient(700px 500px at 8% 25%,rgba(79,140,255,0.08),transparent 60%)," +
            "linear-gradient(180deg,transparent,rgba(238,242,255,0.75) 20%,rgba(238,242,255,0.75) 80%,transparent)",
      }}
    >
      <div className="site-container">
        <AnimateIn>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-16">
            <div className="max-w-160">
              <span className="eyebrow">How We Work</span>
              <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
                An engagement model that delivers
                <br className="hidden lg:block" /> working systems, then transfers ownership.
              </h2>
            </div>
            <p className="text-(--muted) text-[15px] leading-relaxed max-w-80">
              Engagements typically run 6–16 weeks. We embed, ship, document,
              and leave a foundation your team owns.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connector line, desktop only */}
          <div
            aria-hidden="true"
            className="absolute hidden lg:block h-px top-5.5 left-[5%] right-[5%] opacity-50"
            style={{
              background: "linear-gradient(90deg,var(--accent),var(--accent-2),var(--gold),transparent)",
            }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={staggerItem}
              className={`relative px-6 py-2 border-l border-(--border) ${i === 0 ? "lg:border-l-0" : ""}`}
            >
              <div className="w-11 h-11 rounded-full inline-flex items-center justify-center relative z-10 mb-6 bg-(--background) border border-(--border-strong)">
                <span className="font-mono-custom text-xs text-(--ink-dim) tracking-wider">
                  {s.n}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-(--foreground)">
                {s.title}
              </h3>
              <p className="text-sm text-(--muted) leading-[1.55]">{s.body}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
