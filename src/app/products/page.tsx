import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Automation products built in-house by Sysogen. RFP OS takes a bid from solicitation to a cited, review-ready proposal draft.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Products</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Automation products,
            <br />
            <span className="gradient-text">built in-house.</span>
          </h1>
          <p className="mt-6 text-(--muted) text-[clamp(15px,1.5vw,17px)] leading-[1.65] max-w-2xl">
            Products that take a whole process off your team&apos;s plate.
          </p>
        </div>

        {/* RFP OS */}
        <div
          className="card-base overflow-hidden mb-6"
          style={{
            background: "linear-gradient(135deg,rgba(79,140,255,0.06) 0%,rgba(34,211,238,0.04) 100%)",
            borderColor: "rgba(79,140,255,0.25)",
          }}
        >
          <div className="p-10">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[22px] font-semibold tracking-tight text-(--foreground)">RFP OS</h2>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-mono-custom tracking-[0.05em]"
                style={{
                  background: "rgba(79,140,255,0.1)",
                  border: "1px solid rgba(79,140,255,0.25)",
                  color: "var(--accent)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent)" />
                Waitlist open
              </span>
            </div>
            <p className="text-[15px] text-(--muted) leading-[1.7] mb-6 max-w-2xl">
              From solicitation to a cited, review-ready proposal draft.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products/rfp-os" className="btn-primary">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/products/rfp-os#waitlist" className="btn-ghost">
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
