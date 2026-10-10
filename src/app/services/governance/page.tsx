import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Adoption & Governance",
  description:
    "Use AI across the company without losing track of it. Sysogen's AI governance service covers shadow-AI inventory, AI risk and compliance readiness, vendor selection and provenance.",
};

export default function GovernancePage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        <div className="mb-4">
          <Link href="/services" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← Services
          </Link>
        </div>

        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>AI Adoption & Governance</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,60px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Stop Shadow AI.
            <br />
            <span className="gradient-text">Get measurable ROI. Survive the next audit.</span>
          </h1>
        </div>

        <div className="grid gap-6 mb-12">
          {/* What we do */}
          <div className="card-base p-10">
            <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-(--foreground)">What we do</h2>
            <ul className="space-y-3">
              {[
                "Shadow-AI inventory across your org (tools, prompts, data flows, risk exposure)",
                "Acceptable-use policy framework, drafted with your legal and security teams",
                "Vendor selection: model providers, AI platforms and dev-time AI tooling, with contract and DPA review",
                "AI risk and compliance readiness assessment, with a prioritized remediation roadmap",
                "Provenance instrumentation (optional, via ProveStack)",
                "KPI definition and reporting cadence so leadership can measure ROI",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--accent) shrink-0 opacity-80" />
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
                "4–8 weeks",
                "A Sysogen lead engineer plus supporting team members, paired with your designated business owner",
                "Deliverables: inventory report, policy framework, vendor recommendations, remediation roadmap, KPI dashboard",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--accent) shrink-0 opacity-80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* When this is right */}
          <div className="card-base p-10" style={{ background: "rgba(79,140,255,0.04)", borderColor: "rgba(79,140,255,0.2)" }}>
            <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">When this is the right engagement</h2>
            <p className="text-[15px] text-(--muted) leading-[1.7]">
              You&apos;ve allowed AI tools into the workplace, and now leadership is asking &quot;what data are we
              exposing?&quot;, &quot;are we compliant?&quot;, or &quot;is the productivity boost real?&quot;, and
              the engineering team can&apos;t answer with evidence.
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
