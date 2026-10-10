"use client";

import { AnimateIn, StaggerContainer, staggerItem } from "@/components/AnimateIn";
import { motion } from "framer-motion";
import { Clock, Activity, Compass, EyeOff } from "lucide-react";

const problems = [
  {
    n: "01",
    title: "Skilled people doing repetitive work.",
    body: "Proposal managers reformatting the same answers. Analysts copying figures between systems. Team leads reading every inbound request just to route it. Expensive hours go into work a well-built system can do.",
    icon: Clock,
  },
  {
    n: "02",
    title: "Automation pilots that never reach production.",
    body: "POCs that demo beautifully die at the first scale test. The data isn't ready, the pipelines don't exist and nobody owns it. The Slack channel goes quiet.",
    icon: Activity,
  },
  {
    n: "03",
    title: "No clear plan for AI.",
    body: "Leadership wants AI yesterday. Nobody knows what to automate first, what to build, what to buy or how to measure the return. The roadmap is a wish list.",
    icon: Compass,
  },
  {
    n: "04",
    title: "AI use nobody can see.",
    body: "Employees paste confidential data into ChatGPT, Copilot and a dozen other tools. There's no inventory, no policy and no audit trail.",
    icon: EyeOff,
  },
];

export function Problems() {
  return (
    <section id="problem" className="relative py-4 lg:py-20">
      <div className="site-container">
        <AnimateIn>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div className="max-w-180">
              <span className="eyebrow">Where It Goes Wrong</span>
              <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
                Most teams lose time and control
                <br className="hidden sm:block" /> in the same four ways.
              </h2>
            </div>
            <p className="text-(--muted) text-[15px] leading-relaxed max-w-90">
              We&apos;ve seen the pattern across automotive, aviation, logistics
              and fintech, and we know how to break it.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((it) => (
            <motion.div
              key={it.n}
              variants={staggerItem}
              className="card-base p-4 lg:p-8 cursor-default transition-all duration-300 hover:-translate-y-1 hover:bg-white/4"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-(--accent) bg-[rgba(79,140,255,0.08)] border border-[rgba(79,140,255,0.18)]">
                  <it.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                </div>
                <span className="font-mono-custom text-[11px] text-(--ink-mute) tracking-widest">
                  {it.n}
                </span>
              </div>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] leading-[1.3] mb-3 text-(--foreground)">
                {it.title}
              </h3>
              <p className="text-sm text-(--muted) leading-[1.55]">{it.body}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
