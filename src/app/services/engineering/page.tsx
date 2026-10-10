import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Production Engineering",
  description:
    "Sysogen builds the systems your automation depends on: event-driven architecture, Kubernetes migrations, zero-downtime database refactors and CI/CD with provenance.",
};

export default function EngineeringPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        <div className="mb-4">
          <Link href="/services" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← Services
          </Link>
        </div>

        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>Production Engineering</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,60px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Build the systems your
            <br />
            <span className="gradient-text">automation depends on.</span>
          </h1>
        </div>

        <div className="grid gap-6 mb-12">
          {/* What we do */}
          <div className="card-base p-10">
            <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-(--foreground)">What we do</h2>
            <ul className="space-y-3">
              {[
                "Event-driven architecture (Kafka, CQRS, event sourcing)",
                "Kubernetes / EKS migrations and cost optimization",
                "Zero-downtime database refactors: we've moved 90M+ row tables without a maintenance window",
                "CI/CD with provenance baked in: every artifact signed, every deploy auditable",
                "Legacy modernization where automation and AI are the strategic goal",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--accent-2) shrink-0 opacity-80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Typical engagement */}
          <div className="card-base p-10">
            <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-(--foreground)">Typical engagement</h2>
            <ul className="space-y-3">
              {[
                "8–16 weeks",
                "A Sysogen lead engineer embedded with your team, with specialists from our team pulled in as needed (security review, infra, ML)",
                "Deliverables: working code in your repo, documented runbooks, on-call handover",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--accent-2) shrink-0 opacity-80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* When this is right */}
          <div
            className="card-base p-10"
            style={{ background: "rgba(34,211,238,0.04)", borderColor: "rgba(34,211,238,0.2)" }}
          >
            <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">When this is the right engagement</h2>
            <p className="text-[15px] text-(--muted) leading-[1.7]">
              You have a foundational system blocking the automation or AI initiative your CEO announced. The data isn&apos;t
              ready, the pipelines don&apos;t exist, or the monolith is too brittle to extend. You need an
              engineering team that ships, not a strategy deck.
            </p>
          </div>
        </div>

        <Link href="/contact" className="btn-primary">
          Book a discovery call
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
