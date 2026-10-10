import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sysogen Labs",
  description:
    "Sysogen Labs: tools we build because we keep needing them. ProveStack for AI code provenance, InboxGraph for local email analysis. Available to teams that need them.",
};

export default function LabsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Sysogen Labs</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Tools we build because
            <br />
            <span className="gradient-text">we keep needing them.</span>
          </h1>
          <p className="mt-6 text-(--muted) text-[clamp(15px,1.5vw,17px)] leading-[1.65] max-w-2xl">
            Available to teams that need them too.
          </p>
        </div>

        {/* ProveStack */}
        <div
          className="card-base overflow-hidden mb-6"
          style={{
            background: "linear-gradient(135deg,rgba(79,140,255,0.06) 0%,rgba(232,177,74,0.04) 100%)",
            borderColor: "rgba(79,140,255,0.25)",
          }}
        >
          <div className="p-10">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[22px] font-semibold tracking-tight text-(--foreground)">ProveStack</h2>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-mono-custom tracking-[0.05em]"
                style={{
                  background: "rgba(232,177,74,0.1)",
                  border: "1px solid rgba(232,177,74,0.25)",
                  color: "var(--gold)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--gold)" />
                Early access
              </span>
            </div>
            <p className="text-[15px] text-(--muted) leading-[1.7] mb-6 max-w-2xl">
              Cryptographic provenance for AI-generated code, with evidence for SOC 2 and ISO 42001 audits.
            </p>
            <Link href="/labs/provestack" className="btn-primary">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* InboxGraph */}
        <div className="card-base overflow-hidden mb-16">
          <div className="p-10">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[22px] font-semibold tracking-tight text-(--foreground)">InboxGraph</h2>
              <span className="font-mono-custom text-[10px] text-(--ink-mute) tracking-widest border border-(--border-strong) px-2 py-1 rounded-md">
                Research preview
              </span>
            </div>
            <p className="text-[15px] text-(--muted) leading-[1.7] mb-6 max-w-2xl">
              Email graph analysis that runs entirely on your machine. Local-first, zero telemetry.
            </p>
            <Link href="/labs/inboxgraph" className="btn-ghost">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Why */}
        <div className="card-base p-10">
          <h2 className="text-[18px] font-semibold mb-4 tracking-tight text-(--foreground)">
            Why we ship tools alongside consulting
          </h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            A consulting firm that doesn&apos;t ship its own software has nothing to point at when a prospect asks
            &quot;show me your engineering bar.&quot; Our tools are how we keep ours honest.
          </p>
        </div>
      </div>
    </div>
  );
}
