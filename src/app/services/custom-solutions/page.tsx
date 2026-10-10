import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation & Engineering",
  description:
    "Sysogen turns manual, document-heavy processes into reliable automation: intake, extraction, drafting, review and routing, with human approval wherever a mistake is expensive.",
};

export default function CustomSolutionsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-4xl">
        <div className="mb-4">
          <Link href="/services" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← Services
          </Link>
        </div>

        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>AI Automation & Engineering</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,60px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Turn manual processes
            <br />
            <span className="gradient-text">into reliable automation.</span>
          </h1>
        </div>

        <div className="grid gap-6 mb-12">
          {/* What we do */}
          <div className="card-base p-10">
            <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-(--foreground)">What we do</h2>
            <ul className="space-y-3">
              {[
                "Process automation for document-heavy work: intake, classification, extraction, drafting, review and routing",
                "AI agents and multi-step workflows, with human approval wherever a mistake is expensive",
                "Internal AI assistants on private corpora (your data stays on your infrastructure)",
                "RAG pipelines with strict data boundaries",
                "Developer-facing tooling: CLIs, IDE extensions, CI integrations",
                "LLM cost optimization (token budgets, caching, model routing)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--gold) shrink-0 opacity-80" />
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
                "6–12 weeks",
                "A Sysogen lead engineer plus team members with ML / data-platform background, paired with your ML or platform team",
                "Deliverables: deployed tool in your environment, tests, documentation, training session for your team",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                  <span className="mt-2 w-4 h-px bg-(--gold) shrink-0 opacity-80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* When this is right */}
          <div
            className="card-base p-10"
            style={{ background: "rgba(232,177,74,0.04)", borderColor: "rgba(232,177,74,0.2)" }}
          >
            <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">When this is the right engagement</h2>
            <p className="text-[15px] text-(--muted) leading-[1.7]">
              A process eats hours every week, follows rules you could write down and runs on documents, email
              or forms. Or you&apos;ve validated an AI use case with a POC and need it deployed properly: secured,
              monitored, governed and owned by your team after we hand it over.
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
