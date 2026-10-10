"use client";

import { AnimateIn, StaggerContainer, staggerItem } from "@/components/AnimateIn";
import { motion } from "framer-motion";
import { Building2, Code2, Layers, Lock, BookOpen, UserCheck } from "lucide-react";

const items = [
  {
    title: "Senior engineers, regulated-industry experience",
    body: "Our team has shipped production systems for regulated industries (finance, logistics, healthcare, public sector) with real infrastructure, real audits and real on-call rotations.",
    icon: Building2,
  },
  {
    title: "We ship code, not slides",
    body: "Our deliverable is working software in your repo. We write tests, run on-call shifts and pair with your team. No roadmap decks.",
    icon: Code2,
  },
  {
    title: "Deep, not wide",
    body: "We specialize in document-heavy process automation, event-driven architecture and AI governance. We don't pretend to do everything.",
    icon: Layers,
  },
  {
    title: "Knowledge transfer built in",
    body: "We document as we build, pair-program with your engineers, and run a structured handover. When the engagement ends, your team owns the system.",
    icon: BookOpen,
  },
  {
    title: "People approve what matters.",
    body: "Our automations put a human approval step wherever a mistake is expensive, and we design them so outputs can be traced back to their sources.",
    icon: UserCheck,
  },
  {
    title: "Security and governance first",
    body: "Every system we deliver is designed for auditability and zero trust from day one. Access controls, audit trails and data boundaries are part of the design, not added at the end.",
    icon: Lock,
  },
];

export function TrustSignals() {
  return (
    <section id="why" className="relative py-4 lg:py-20">
      <div className="site-container">
        <AnimateIn>
          <div className="mb-14 max-w-180">
            <span className="eyebrow">Why Sysogen</span>
            <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
              Engineering-led,
              <br />
              product-backed, paid for outcomes.
            </h2>
          </div>
        </AnimateIn>

        <div
          className="rounded-[14px] overflow-hidden border border-(--border)"
          style={{ background: "var(--border)" }}
        >
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={staggerItem}
                className="p-4 lg:p-8 transition-colors duration-200 cursor-default bg-(--background) hover:bg-white/2.5"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-(--accent) bg-[rgba(79,140,255,0.08)] border border-[rgba(79,140,255,0.18)]">
                  <it.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight leading-[1.3] mb-3 text-(--foreground)">
                  {it.title}
                </h3>
                <p className="text-sm text-(--muted) leading-[1.55]">{it.body}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
