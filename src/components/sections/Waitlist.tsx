"use client";

import { AnimateIn } from "@/components/AnimateIn";
import { WaitlistSlot } from "@/components/waitlist/WaitlistSlot";

export function Waitlist() {
  return (
    <section id="waitlist" className="relative py-4 lg:py-20">
      <div className="site-container">
        <AnimateIn>
          <div className="card-base overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="p-4 lg:p-14">
                <span className="eyebrow">Waitlist</span>
                <h2 className="mt-4 mb-5 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
                  Get access
                  <br />
                  to what we&apos;re building.
                </h2>
                <p className="text-(--muted) text-[15px] leading-relaxed max-w-120 mb-6">
                  Join the waitlist for RFP OS, ProveStack and InboxGraph, and tell us
                  which products you&apos;d like to use.
                </p>
                <p
                  className="text-[14px] text-(--foreground) leading-[1.6] max-w-120 rounded-lg px-4 py-3 border"
                  style={{
                    background: "rgba(79,140,255,0.06)",
                    borderColor: "rgba(79,140,255,0.22)",
                  }}
                >
                  We&apos;re opening access in phases. As each phase opens, we&apos;ll send
                  invitations in waves until everyone on the waitlist has been invited.
                </p>
              </div>
              <div className="p-4 lg:p-14 border-t lg:border-t-0 lg:border-l border-(--border) flex items-center">
                <WaitlistSlot />
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
