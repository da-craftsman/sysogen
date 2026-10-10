import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Code2, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sysogen offers AI automation and engineering, production engineering, and AI adoption and governance services. Less manual work, with people approving what matters.",
};

const services = [
  {
    icon: Cpu,
    title: "AI Automation & Engineering",
    lead: "Turn slow, manual processes into reliable automated ones.",
    bullets: [
      "Document-heavy process automation",
      "AI agents with human approval steps",
      "Internal AI assistants on private documents",
    ],
    href: "/services/custom-solutions",
    accent: "var(--gold)",
    accentBg: "rgba(232,177,74,0.08)",
    accentBorder: "rgba(232,177,74,0.2)",
  },
  {
    icon: Code2,
    title: "Production Engineering",
    lead: "Build the systems your automation depends on.",
    bullets: [
      "Event-driven architecture",
      "Kubernetes migrations and cost optimization",
      "Zero-downtime database refactors",
    ],
    href: "/services/engineering",
    accent: "var(--accent-2)",
    accentBg: "rgba(34,211,238,0.08)",
    accentBorder: "rgba(34,211,238,0.2)",
  },
  {
    icon: ShieldCheck,
    title: "AI Adoption & Governance",
    lead: "Use AI across the company without losing track of it.",
    bullets: [
      "Shadow-AI inventory (4–6 weeks)",
      "AI risk and compliance readiness",
      "Vendor selection and contract review",
    ],
    href: "/services/governance",
    accent: "var(--accent)",
    accentBg: "rgba(79,140,255,0.08)",
    accentBorder: "rgba(79,140,255,0.2)",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow">Services</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            We do three things.
            <br />
            <span className="gradient-text">Done well.</span>
          </h1>
        </div>

        {/* Service cards */}
        <div className="flex flex-col gap-4 mb-16">
          {services.map((s) => (
            <div
              key={s.title}
              className="card-base overflow-hidden"
              style={{ borderColor: s.accentBorder }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] p-8 md:p-10 gap-8 items-start">
                {/* Left */}
                <div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: s.accentBg, border: `1px solid ${s.accentBorder}`, color: s.accent }}
                  >
                    <s.icon className="w-5 h-5" strokeWidth={1.4} />
                  </div>
                  <h2 className="text-[20px] font-semibold tracking-tight mb-2 text-(--foreground)">{s.title}</h2>
                  <p className="text-[14px] text-(--muted) leading-[1.6]">{s.lead}</p>
                </div>

                {/* Middle */}
                <ul className="space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14px] text-(--foreground)">
                      <span className="mt-2 w-4 h-px shrink-0 opacity-70" style={{ background: s.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="md:self-center">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: s.accent }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement model */}
        <div className="card-base p-10 mb-12">
          <div className="font-mono-custom text-[11px] text-(--ink-mute) tracking-[0.12em] uppercase mb-4">
            Engagement model
          </div>
          <p className="text-[16px] text-(--foreground) font-medium mb-2">
            Discovery → Strategy → Engineering → Handover. 6–16 weeks typical.
          </p>
          <p className="text-[14px] text-(--muted) leading-[1.6] mb-6">
            We embed with your team, ship production-grade systems, and leave a documented foundation your team owns.
          </p>
          <Link href="/#approach" className="inline-flex items-center gap-1.5 text-sm text-(--accent) font-medium hover:underline">
            Read about how we work <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* RFP OS pointer */}
        <p className="text-[15px] text-(--muted) leading-[1.6] mb-12">
          Need proposal automation? RFP OS takes a bid from solicitation to a cited first draft.{" "}
          <Link href="/products/rfp-os" className="text-(--accent) font-medium hover:underline whitespace-nowrap">
            Explore RFP OS →
          </Link>
        </p>

        {/* Bottom CTA */}
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Book a discovery call
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
