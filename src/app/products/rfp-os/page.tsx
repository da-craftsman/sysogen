import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Hourglass,
  TriangleAlert,
  FolderSearch,
  Bot,
  FileSearch,
  Table2,
  Quote,
  BookCheck,
  ClipboardCheck,
  LayoutPanelLeft,
  MonitorPlay,
  FileDown,
  Cloud,
  Globe,
  Trash2,
  Ban,
  Lock,
  KeyRound,
  Plus,
} from "lucide-react";
import { RfpOsPanel } from "@/components/MockPanel";
import { WaitlistSlot } from "@/components/waitlist/WaitlistSlot";

export const metadata: Metadata = {
  title: "RFP OS: proposal automation",
  description:
    "RFP OS reads the solicitation, extracts its requirements and drafts a complete proposal from your own documents, with numbered citations, a compliance matrix and a review guide.",
};

const problems = [
  {
    icon: Hourglass,
    title: "Weeks spent before writing starts.",
    body: "Teams read hundreds of pages of solicitation, amendments and attachments just to work out what's being asked.",
  },
  {
    icon: TriangleAlert,
    title: "Compliance gaps found too late.",
    body: "A missed requirement can disqualify a bid, and most teams track requirements in spreadsheets.",
  },
  {
    icon: FolderSearch,
    title: "Your best content is scattered.",
    body: "Past proposals, résumés, case studies and certifications sit across SharePoint, Google Drive, Confluence and inboxes.",
  },
  {
    icon: Bot,
    title: "Generic AI makes things up.",
    body: "Chatbots invent the contract numbers, certifications and metrics an evaluator will check.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect your knowledge.",
    body: "Link SharePoint, Google Drive, Confluence and the other places your content lives.",
  },
  {
    n: "02",
    title: "Upload the solicitation.",
    body: "RFP OS extracts the response structure, format rules, questions and requirements.",
  },
  {
    n: "03",
    title: "Review the template.",
    body: "Check the outline and requirement list before anything is written.",
  },
  {
    n: "04",
    title: "Generate and watch it run.",
    body: "See a cost estimate first, then watch every step live in Mission Control.",
  },
  {
    n: "05",
    title: "Review, edit, export.",
    body: "Edit in the workspace, ask the assistant to rework a section, and export DOCX or PDF with citations, the compliance matrix and a review guide.",
  },
];

const features = [
  {
    icon: FileSearch,
    title: "Requirement extraction",
    body: "Requirements, questions and format rules from the solicitation, amendments and attachments.",
  },
  {
    icon: Table2,
    title: "Compliance matrix",
    body: "Each requirement mapped to the section that answers it.",
  },
  {
    icon: Quote,
    title: "Cited drafting",
    body: "Each section drafted from your own documents, with numbered citations.",
  },
  {
    icon: BookCheck,
    title: "Sourced facts only",
    body: "Names, numbers, dates, ratings and certifications must come from your documents. If there's no source, the draft shows a placeholder.",
  },
  {
    icon: ClipboardCheck,
    title: "Review guide",
    body: "What each section claims, where evidence is thin and what to check before you submit.",
  },
  {
    icon: LayoutPanelLeft,
    title: "Proposal workspace",
    body: "Edit, compare versions, roll back and rework sections with the assistant.",
  },
  {
    icon: MonitorPlay,
    title: "Mission Control",
    body: "Live progress, with an estimate before the run and the actual cost after.",
  },
  {
    icon: FileDown,
    title: "Word and PDF exports",
    body: "With citations, the compliance matrix and the review guide.",
  },
];

const dataItems = [
  {
    icon: Cloud,
    title: "Managed or your own cloud",
    body: "Use our managed cloud, or deploy into your own AWS account.",
  },
  {
    icon: Globe,
    title: "Choose your region",
    body: "US or EU, picked at sign-up.",
  },
  {
    icon: Trash2,
    title: "Keep it or wipe it",
    body: "Seal a managed workspace between bids, or wipe it and get a deletion certificate.",
  },
  {
    icon: Ban,
    title: "Never used for training",
    body: "Your documents, prompts and drafts never train any AI model.",
  },
  {
    icon: Lock,
    title: "Isolated by design",
    body: "Each organization gets its own storage and encryption key.",
  },
  {
    icon: KeyRound,
    title: "Enterprise sign-in",
    body: "Email, Google or Microsoft for everyone; single sign-on and SCIM on Enterprise.",
  },
];

const connectors = [
  "File upload",
  "Pasted text",
  "Web links",
  "SharePoint and OneDrive",
  "OneNote",
  "Google Drive",
  "Box",
  "Dropbox",
  "Confluence Cloud",
  "Notion",
  "Amazon S3",
  "Responsive",
];

const plans = [
  {
    name: "Pro",
    body: "All features, connectors and deployment options. Business-hours support.",
  },
  {
    name: "Enterprise",
    body: "Everything in Pro, plus single sign-on, SCIM provisioning, 24/7 support and an uptime SLA.",
  },
];

const roadmap = [
  {
    phase: "Core",
    accent: "var(--accent)",
    items: [
      "Requirement and template extraction",
      "Cited drafting with fact checks",
      "Compliance matrix and review guide",
      "Workspace, assistant chat and Mission Control",
      "DOCX and PDF export",
      "Connectors and one-click sync",
      "Managed workspaces or your own AWS account",
      "US federal and commercial proposal packs",
    ],
  },
  {
    phase: "Next",
    accent: "var(--accent-2)",
    items: [
      "Answer library",
      "Color-team reviews (pink, red and gold)",
      "Customer-held encryption keys",
      "More connectors",
      "Azure, Google Cloud and Kubernetes",
    ],
  },
  {
    phase: "Later",
    accent: "var(--gold)",
    items: [
      "Opportunity radar (SAM.gov, TED, state portals)",
      "EU public-procurement pack",
      "Security questionnaires",
      "Public API and MCP server",
      "Résumé matching, pricing assistant, win/loss learning and teaming partner search",
    ],
  },
];

const faqs = [
  {
    q: "How do I get access?",
    a: "Join the waitlist. We're opening access in phases and will keep sending invitations until everyone on the list has been invited.",
  },
  {
    q: "Does it write the whole proposal?",
    a: "It drafts every section. Your team reviews, edits and approves it, and missing evidence shows as a placeholder instead of an invented answer.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "No, never.",
  },
  {
    q: "Can I run it in my own cloud?",
    a: "Yes. Deploy it in your own AWS account, and your documents and drafts stay inside it.",
  },
  {
    q: "Can I upload CUI or export-controlled data?",
    a: "Not to a managed workspace. Teams with those requirements can run RFP OS in their own AWS account.",
  },
  {
    q: "How much does it cost?",
    a: "A platform fee plus metered usage, with an estimate before every run.",
  },
];

function SectionHeading({ eyebrow, line1, line2 }: { eyebrow: string; line1: string; line2: string }) {
  return (
    <div className="mb-10 max-w-180">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(28px,3.2vw,44px)]">
        {line1}
        <br />
        {line2}
      </h2>
    </div>
  );
}

function IconBox({ icon: Icon }: { icon: typeof Cloud }) {
  return (
    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-(--accent) bg-[rgba(79,140,255,0.08)] border border-[rgba(79,140,255,0.18)]">
      <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
    </div>
  );
}

export default function RfpOsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container">
        <div className="mb-4">
          <Link href="/products" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← Products
          </Link>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-12 items-center mb-24">
          <div>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>
              RFP OS · Proposal Automation
            </span>
            <h1 className="mt-5 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
              Answer more RFPs
              <br />
              <span className="gradient-text">with the team you already have.</span>
            </h1>
            <p className="mt-6 text-(--muted) text-[clamp(15px,1.5vw,18px)] leading-[1.6] max-w-150">
              RFP OS reads the solicitation, extracts its requirements and drafts a complete proposal from
              your own documents. Every name, number, date and certification comes from a sourced fact, and a
              review guide tells your team what to check.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#waitlist" className="btn-primary">
                Join the waitlist
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href="#how-it-works" className="btn-ghost">
                See how it works
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <RfpOsPanel />
          </div>
        </section>

        {/* The problem */}
        <section className="mb-24">
          <SectionHeading eyebrow="The Problem" line1="Proposal work is slow," line2="manual and easy to get wrong." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p) => (
              <div key={p.title} className="card-base p-6 lg:p-8">
                <div className="mb-8">
                  <IconBox icon={p.icon} />
                </div>
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] leading-[1.3] mb-3 text-(--foreground)">
                  {p.title}
                </h3>
                <p className="text-sm text-(--muted) leading-[1.55]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mb-24 scroll-mt-28">
          <SectionHeading eyebrow="How It Works" line1="Five steps from solicitation" line2="to a review-ready draft." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-0 relative">
            <div
              aria-hidden="true"
              className="absolute hidden lg:block h-px top-5.5 left-[5%] right-[5%] opacity-50"
              style={{ background: "linear-gradient(90deg,var(--accent),var(--accent-2),var(--gold),transparent)" }}
            />
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`relative px-6 py-2 mb-6 lg:mb-0 border-l border-(--border) ${i === 0 ? "lg:border-l-0" : ""}`}
              >
                <div className="w-11 h-11 rounded-full inline-flex items-center justify-center relative z-10 mb-6 bg-(--background) border border-(--border-strong)">
                  <span className="font-mono-custom text-xs text-(--ink-dim) tracking-wider">{s.n}</span>
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight mb-3 text-(--foreground)">{s.title}</h3>
                <p className="text-sm text-(--muted) leading-[1.55]">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What it does */}
        <section className="mb-24">
          <SectionHeading eyebrow="What It Does" line1="Everything a bid team needs" line2="to get to a first draft." />
          <div className="rounded-[14px] overflow-hidden border border-(--border)" style={{ background: "var(--border)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
              {features.map((f) => (
                <div key={f.title} className="p-6 lg:p-8 bg-(--background)">
                  <div className="mb-6">
                    <IconBox icon={f.icon} />
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight leading-[1.3] mb-2.5 text-(--foreground)">
                    {f.title}
                  </h3>
                  <p className="text-sm text-(--muted) leading-[1.55]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Your data */}
        <section className="mb-24">
          <SectionHeading eyebrow="Your Data" line1="Your documents stay yours," line2="wherever RFP OS runs." />
          <div className="rounded-[14px] overflow-hidden border border-(--border)" style={{ background: "var(--border)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px">
              {dataItems.map((d) => (
                <div key={d.title} className="p-6 lg:p-8 bg-(--background)">
                  <div className="mb-6">
                    <IconBox icon={d.icon} />
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight leading-[1.3] mb-2.5 text-(--foreground)">
                    {d.title}
                  </h3>
                  <p className="text-sm text-(--muted) leading-[1.55]">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connectors */}
        <section className="mb-24">
          <SectionHeading eyebrow="Connectors" line1="Connects to the places" line2="your content already lives." />
          <div className="flex flex-wrap gap-2.5">
            {connectors.map((c) => (
              <span
                key={c}
                className="text-sm font-medium text-(--ink-dim) px-3.5 py-2 rounded-lg border border-(--border-strong) bg-(--card)"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-24">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
            <div className="max-w-180">
              <span className="eyebrow">Pricing</span>
              <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(28px,3.2vw,44px)]">
                Pay for
                <br />
                what you use.
              </h2>
            </div>
            <p className="text-(--muted) text-[15px] leading-relaxed max-w-100">
              A platform fee plus metered usage. You see an estimate before every run and the actual cost
              after it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className="card-base p-8 lg:p-10"
                style={i === 1 ? { borderColor: "rgba(79,140,255,0.3)", background: "rgba(79,140,255,0.04)" } : undefined}
              >
                <h3 className="text-[22px] font-semibold tracking-tight mb-3 text-(--foreground)">{p.name}</h3>
                <p className="text-[15px] text-(--muted) leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-24">
          <SectionHeading eyebrow="What We're Building" line1="Where RFP OS" line2="is going." />
          <div className="grid md:grid-cols-3 gap-4">
            {roadmap.map((col) => (
              <div key={col.phase} className="card-base p-8">
                <div
                  className="font-mono-custom text-[11px] tracking-[0.14em] uppercase mb-5"
                  style={{ color: col.accent }}
                >
                  {col.phase}
                </div>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-(--foreground) leading-[1.5]">
                      <span className="mt-2.5 w-4 h-px shrink-0 opacity-80" style={{ background: col.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24 max-w-4xl">
          <div className="mb-10">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(28px,3.2vw,44px)]">
              Questions we hear often.
            </h2>
          </div>
          <div className="card-base divide-y divide-(--border)">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item group px-6 lg:px-8">
                <summary className="flex items-center justify-between gap-6 py-5 text-[16px] font-medium text-(--foreground)">
                  {f.q}
                  <Plus className="faq-icon w-4 h-4 shrink-0 text-(--ink-mute) transition-transform duration-200" />
                </summary>
                <p className="pb-6 -mt-1 text-[15px] text-(--muted) leading-[1.65] max-w-180">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="scroll-mt-28">
          <div className="card-base p-8 lg:p-14" style={{ borderColor: "rgba(79,140,255,0.3)" }}>
            <h2 className="font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(28px,3.2vw,44px)] mb-5">
              Join the RFP OS
              <br />
              waitlist.
            </h2>
            <p className="text-[15px] text-(--muted) leading-[1.65] max-w-150 mb-8">
              We&apos;re opening access in phases. As each phase opens, we&apos;ll send invitations in waves
              until everyone on the waitlist has been invited.
            </p>
            <WaitlistSlot preselect="rfp-os" />
          </div>
        </section>
      </div>
    </div>
  );
}
