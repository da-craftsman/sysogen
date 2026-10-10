"use client";

import { AnimateIn } from "@/components/AnimateIn";
import { useTheme } from "@/components/ThemeProvider";

const cats = [
  {
    label: "AI & LLM Ops",
    items: ["Anthropic API (Claude)", "OpenAI API", "Amazon Bedrock", "LangChain", "Private RAG (pgvector, Qdrant, LanceDB)", "RFP OS and ProveStack (in-house)"],
  },
  {
    label: "Production Engineering",
    items: ["Go", "Python", "Java / Spring Boot", "Kotlin", "Rust", "PostgreSQL", "Event-driven (Kafka, CQRS)"],
  },
  {
    label: "Infrastructure",
    items: ["Kubernetes (EKS)", "Terraform / OpenTofu", "Vault", "Prometheus + Grafana", "GitHub Actions"],
  },
];

export function TechStack() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section
      id="stack"
      className="relative py-4 lg:py-20"
      style={{
        background: isDark
          ? "linear-gradient(180deg,transparent,rgba(11,16,32,0.4) 30%,rgba(11,16,32,0.4) 70%,transparent)"
          : "radial-gradient(900px 600px at 8% 65%,rgba(79,140,255,0.1),transparent 65%)," +
            "radial-gradient(700px 500px at 92% 25%,rgba(34,211,238,0.08),transparent 60%)," +
            "linear-gradient(180deg,transparent,rgba(228,234,255,0.75) 20%,rgba(228,234,255,0.75) 80%,transparent)",
      }}
    >
      <div className="site-container">
        <AnimateIn>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div className="max-w-160">
              <span className="eyebrow">Our Tech Stack</span>
              <h2 className="mt-4 font-bold tracking-tight leading-[1.1] text-(--foreground) text-[clamp(32px,3.5vw,52px)]">
                The stack we know
                <br />
                down to the threading model.
              </h2>
            </div>
            <p className="text-(--muted) text-sm leading-relaxed max-w-80">
              Three categories. The tools we reach for when correctness and auditability both matter.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="rounded-[14px] overflow-hidden border border-(--border)">
            {cats.map((cat, i) => (
              <div
                key={cat.label}
                className="flex flex-col gap-2.5 px-5 py-5 lg:grid lg:items-center lg:gap-5 lg:px-7"
                style={{
                  gridTemplateColumns: "220px 1fr",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="font-mono-custom text-[11px] text-(--ink-dim) tracking-[0.12em] uppercase shrink-0">
                  {cat.label}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                  {cat.items.map((t) => (
                    <span
                      key={t}
                      className="text-sm text-(--ink-dim) font-medium transition-colors duration-150 hover:text-(--foreground) cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
