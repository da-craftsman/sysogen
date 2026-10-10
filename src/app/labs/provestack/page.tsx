import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, GitCommit, Terminal, ClipboardList, Server, X } from "lucide-react";
import { WaitlistSlot } from "@/components/waitlist/WaitlistSlot";

export const metadata: Metadata = {
  title: "ProveStack: AI Code Provenance",
  description:
    "ProveStack signs AI-generated code at the moment a model writes it. Evidence for SOC 2 and ISO 42001 audits. Self-hosted proxy, so your prompts never leave your network.",
};

const features = [
  { icon: ShieldCheck, label: "Cryptographic signature embedded at generation time" },
  { icon: GitCommit, label: "Per-commit manifest: model, prompt, reviewer, CI run" },
  { icon: Terminal, label: "Verifier CLI for auditors and CI pipelines, no infra access required" },
  { icon: ClipboardList, label: "Tamper-evident audit log, exportable" },
  { icon: Server, label: "Self-hosted proxy: your prompts never reach our cloud" },
];

const gives = [
  "Audit evidence: which model contributed to which artifact, in a verifiable chain",
  "SOC 2 / ISO 42001 control evidence for AI-assisted development",
  "Confidence that your codebase isn't quietly accumulating untraceable AI output",
  "A trust signal for your customers: cryptographically prove which parts of your product had human review",
];

const doesNot = [
  "It doesn't restrict which AI tools your developers use. It observes and signs them.",
  "It doesn't reduce model quality or latency in a way developers notice.",
  "It doesn't require your prompts to leave your network. The proxy is self-hosted.",
];

export default function ProveStackPage() {
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
            <span className="eyebrow" style={{ color: "var(--gold)" }}>ProveStack</span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-mono-custom tracking-[0.05em]"
              style={{
                background: "rgba(232,177,74,0.1)",
                border: "1px solid rgba(232,177,74,0.25)",
                color: "var(--gold)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-(--gold)" />
              Early access · Limited cohort
            </span>
          </div>

          <h1 className="text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground) mb-6">
            Every line of AI-generated code,
            <br />
            <span className="gradient-text">cryptographically signed.</span>
          </h1>

          <div className="flex flex-wrap gap-3">
            <a href="#waitlist" className="btn-primary">
              Join the waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a href="mailto:hello@sysogen.com?subject=ProveStack docs" className="btn-ghost">
              Request docs
            </a>
          </div>
        </div>

        {/* The problem */}
        <div className="card-base p-10 mb-6">
          <h2 className="text-[20px] font-semibold mb-5 tracking-tight text-(--foreground)">The problem</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7] mb-5">
            Auditors and your future engineering team will eventually ask the same question:
            &quot;Which lines of code came from which model, when, under whose review?&quot; Today, most teams can&apos;t answer.
          </p>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            Source control captures the diff, but not the model. Code review approves the change, but not
            the provenance. CI signs the build artifact, but not the source intent. As more of your code is
            written with AI, that gap becomes an audit finding waiting to happen.
          </p>
        </div>

        {/* What ProveStack does */}
        <div className="card-base p-10 mb-6">
          <h2 className="text-[20px] font-semibold mb-5 tracking-tight text-(--foreground)">What ProveStack does</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            ProveStack signs AI-generated code at the moment a model writes it. It embeds a tamper-resistant
            signature directly in the source: invisible to humans, machine-detectable. Every commit ships with
            a signed manifest tying each change to its model, prompt, reviewer, and CI run. Auditors verify
            the chain with a free CLI; no access to your infrastructure required.
          </p>
        </div>

        {/* How it integrates */}
        <div className="card-base p-10 mb-6">
          <h2 className="text-[20px] font-semibold mb-5 tracking-tight text-(--foreground)">How it integrates</h2>
          <ul className="space-y-3">
            {[
              "Drop-in proxy in front of your AI provider (Anthropic, OpenAI, AWS Bedrock, Azure OpenAI). Your prompts never touch our cloud",
              "Sign commits in CI with a one-line GitHub Action or GitLab CI job",
              "Verify any commit with a single CLI command, on a developer laptop or an auditor's workstation",
              "Export tamper-evident audit log on demand, in formats your auditors already use",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14.5px] text-(--foreground)">
                <span className="mt-2 w-4 h-px bg-(--accent) shrink-0 opacity-80" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What it gives you + does NOT */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="card-base p-8">
            <h2 className="text-[18px] font-semibold mb-5 tracking-tight text-(--foreground)">What it gives you</h2>
            <ul className="space-y-3">
              {gives.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13.5px] text-(--foreground)">
                  <ShieldCheck className="w-4 h-4 text-(--accent) shrink-0 mt-0.5" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-base p-8">
            <h2 className="text-[18px] font-semibold mb-5 tracking-tight text-(--foreground)">What it does NOT do</h2>
            <ul className="space-y-3">
              {doesNot.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13.5px] text-(--muted)">
                  <X className="w-4 h-4 text-(--ink-mute) shrink-0 mt-0.5" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="card-base p-10 mb-6">
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-(--foreground)">Features</h2>
          <ul className="space-y-3">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-[14.5px] text-(--foreground)">
                <Icon className="w-4.5 h-4.5 text-(--accent) shrink-0" strokeWidth={1.5} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div
          className="card-base p-10 mb-6"
          style={{ background: "rgba(232,177,74,0.04)", borderColor: "rgba(232,177,74,0.2)" }}
        >
          <h2 className="text-[20px] font-semibold mb-4 tracking-tight text-(--foreground)">Pricing</h2>
          <p className="text-[15px] text-(--muted) leading-[1.7]">
            Early access is free for the first 25 teams. After general availability, pricing will be
            team-based, with a free tier for individuals and open-source projects. Self-hosted enterprise
            tier available on request.
          </p>
        </div>

        {/* Waitlist */}
        <div id="waitlist" className="card-base p-10 mb-6 scroll-mt-28" style={{ borderColor: "rgba(79,140,255,0.3)" }}>
          <h2 className="text-[20px] font-semibold mb-2 tracking-tight text-(--foreground)">Join the waitlist</h2>
          <p className="text-[14px] text-(--muted) mb-6">
            We&apos;re onboarding the first cohort now. Tell us about your setup and we&apos;ll be in touch.
          </p>
          <WaitlistSlot preselect="provestack" />
        </div>

        {/* Built by Sysogen */}
        <div className="card-base p-8">
          <p className="text-[14px] text-(--muted) leading-[1.7]">
            <span className="text-(--foreground) font-medium">Built by Sysogen.</span> ProveStack is built and
            operated by Sysogen, an AI automation company. We ship it because we use it ourselves, and
            because our clients keep asking for it.
          </p>
        </div>
      </div>
    </div>
  );
}
