"use client";

import { AnimateIn } from "@/components/AnimateIn";
import { ArrowRight, ShieldCheck, MessageSquare, ExternalLink } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    text: "We ship our own software. RFP OS and ProveStack are built by our own engineers.",
  },
  {
    icon: ExternalLink,
    text: "Our engagement model, deliverables, and pricing-band are documented openly.",
  },
  {
    icon: MessageSquare,
    text: "First call is free. Thirty minutes tells you whether we fit. No commitment.",
  },
];

export function WhyTrust() {
  return (
    <section id="results" className="relative py-4 lg:py-20">
      <div className="site-container">
        <AnimateIn>
          <div className="mb-14 max-w-180">
            <span className="eyebrow">Why Trust Us</span>
            <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
              Sysogen is new.
              <br />
              What we build is verifiable today.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="card-base overflow-hidden">
            <div className="p-4 lg:p-14">
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {trustItems.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-(--accent) bg-[rgba(79,140,255,0.08)] border border-[rgba(79,140,255,0.18)]">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <p className="text-[15px] text-(--foreground) leading-[1.55]">{text}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-(--ink-mute) italic border-t border-(--border) pt-6">
                Once our first Sysogen client engagement is published, it will live here.
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/contact" className="btn-primary">
              Book a free 30-minute call
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a href="/products/rfp-os" className="btn-ghost">
              Explore RFP OS
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
