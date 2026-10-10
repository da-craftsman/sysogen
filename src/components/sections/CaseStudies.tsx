"use client";

import { AnimateIn, StaggerContainer, staggerItem } from "@/components/AnimateIn";
import { motion } from "framer-motion";

const cases = [
  {
    tag: "EUROPEAN LOGISTICS",
    title: "Zero-downtime migration of 93M+ rows",
    challenge:
      "Migrating an event-sourced JSONB database to a modern flat schema while a live operations system kept ingesting.",
    what: "Designed and executed a phased migration with batching, KEDA autoscaling on Kubernetes, and comprehensive data validation.",
    metric: "40%",
    metricLabel: "query performance improvement",
    quote: "Migration completed with zero data loss.",
    accent: "var(--accent)",
  },
  {
    tag: "US PET TECHNOLOGY PLATFORM",
    title: "18+ services modernized in 4 months",
    challenge:
      "Java 11 → 17+ across the fleet, Spring Boot upgrades, and remediation of 200+ security vulnerabilities, without freezing feature work.",
    what: "Systematic upgrade across all services, Maven parent POM restructuring, Dependabot integration, CI/CD pipeline improvements.",
    metric: "95%",
    metricLabel: "reduction in vulnerabilities",
    quote: "Completed on schedule, no production incidents.",
    accent: "var(--accent-2)",
  },
  {
    tag: "FINANCIAL SERVICES",
    title: "AI-powered RFP response pipeline",
    challenge:
      "Consulting firm spending two weeks per RFP response. Knowledge scattered across SharePoint, Confluence, and Slack.",
    what: "Built a RAG pipeline with document ingestion, semantic search, and LLM-powered response generation with human-in-the-loop review.",
    metric: "7×",
    metricLabel: "faster turnaround",
    quote: "Response time cut from 2 weeks to 2 days.",
    accent: "var(--gold)",
  },
];

export function CaseStudies() {
  return (
    <section id="results" className="relative py-20">
      <div className="site-container">
        <AnimateIn>
          <div className="mb-14 max-w-180">
            <span className="eyebrow">Results that speak</span>
            <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
              Selected projects from
              <br />
              our founder's engineering career.
            </h2>
          </div>
        </AnimateIn>

        <StaggerContainer className="flex flex-col gap-3.5">
          {cases.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              className="card-base overflow-hidden relative"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-0.75"
                style={{ background: c.accent }}
              />

              <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr_0.6fr]">
                {/* Col 1 */}
                <div className="p-4 md:p-8 md:pl-10 md:border-r border-b md:border-b-0 border-(--border)">
                  <span className="font-mono-custom text-[10.5px] text-(--ink-mute) tracking-[0.14em] uppercase">
                    {c.tag}
                  </span>
                  <h3 className="mt-3 font-medium leading-[1.2] text-(--foreground) text-[clamp(18px,1.8vw,22px)] tracking-tight">
                    {c.title}
                  </h3>
                </div>

                {/* Col 2 */}
                <div className="p-4 md:p-8 md:border-r border-b md:border-b-0 border-(--border) grid gap-4">
                  <div>
                    <div className="font-mono-custom text-[10px] text-(--ink-mute) tracking-widest uppercase mb-1.5">
                      Challenge
                    </div>
                    <p className="text-sm text-(--foreground) leading-[1.55]">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="font-mono-custom text-[10px] text-(--ink-mute) tracking-widest uppercase mb-1.5">
                      What we did
                    </div>
                    <p className="text-sm text-(--muted) leading-[1.55]">{c.what}</p>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="p-4 md:p-8 flex flex-col justify-between gap-4">
                  <div>
                    <div
                      className="font-medium leading-none mb-2 text-[clamp(40px,4vw,56px)] tracking-[-0.04em]"
                      style={{ color: c.accent }}
                    >
                      {c.metric}
                    </div>
                    <div className="text-[12.5px] text-(--ink-dim) leading-[1.4]">
                      {c.metricLabel}
                    </div>
                  </div>
                  <div className="font-serif-custom italic text-base text-(--ink-dim) leading-[1.4]">
                    "{c.quote}"
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
