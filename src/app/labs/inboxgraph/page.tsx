import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistSlot } from "@/components/waitlist/WaitlistSlot";

export const metadata: Metadata = {
  title: "InboxGraph: Local Email Analysis",
  description:
    "InboxGraph runs entirely on your machine. Email graph analysis with no cloud dependency, no telemetry, no copies of your inbox sent anywhere. Research preview by Sysogen.",
};

export default function InboxGraphPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        <div className="mb-4">
          <Link href="/labs" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← Sysogen Labs
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow" style={{ color: "var(--accent-2)" }}>InboxGraph</span>
            <span className="font-mono-custom text-[10px] text-(--ink-mute) tracking-widest border border-(--border-strong) px-2 py-1 rounded-md">
              Research preview
            </span>
          </div>

          <h1 className="text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground) mb-6">
            Email graph analysis that runs
            <br />
            <span className="gradient-text">entirely on your machine.</span>
          </h1>
        </div>

        {/* What it does */}
        <div className="card-base p-10 mb-6">
          <h2 className="text-[20px] font-semibold mb-5 tracking-tight text-(--foreground)">What it does</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            InboxGraph reads your local mailbox, builds a graph of senders, threads, and topics, and surfaces
            insights without sending any data to a cloud service. The model runs on-device.
          </p>
        </div>

        {/* Current status */}
        <div
          className="card-base p-10 mb-6"
          style={{ background: "rgba(34,211,238,0.04)", borderColor: "rgba(34,211,238,0.2)" }}
        >
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">Current status</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            Research preview. We&apos;re refining the analysis engine and the UI. No public release yet.
          </p>
        </div>

        {/* Why we built it */}
        <div className="card-base p-10 mb-12">
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">Why we built it</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            Every &quot;email intelligence&quot; tool we looked at required uploading the inbox to someone else&apos;s cloud.
            We wanted to see whether useful analysis was possible without that. It is.
          </p>
        </div>

        {/* Waitlist */}
        <div id="waitlist" className="card-base p-10 scroll-mt-28" style={{ borderColor: "rgba(34,211,238,0.3)" }}>
          <h2 className="text-[20px] font-semibold mb-2 tracking-tight text-(--foreground)">Join the waitlist</h2>
          <p className="text-[14px] text-(--muted) mb-6">
            We&apos;re opening access in phases and will invite people in waves.
          </p>
          <WaitlistSlot preselect="inboxgraph" />
        </div>
      </div>
    </div>
  );
}
