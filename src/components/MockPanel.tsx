"use client";

import { ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

/** Window frame used for the product mock panels (ProveStack ledger, RFP OS run). */
export function MockWindow({ title, children }: { title: string; children: ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="w-full max-w-95 rounded-xl overflow-hidden border border-(--border-strong)"
      style={{
        background: isDark ? "rgba(7,9,15,0.85)" : "var(--card)",
        boxShadow: isDark
          ? "0 24px 48px -16px rgba(0,0,0,0.6)"
          : "0 24px 48px -16px rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--border)">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className={`w-2 h-2 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}
            />
          ))}
        </div>
        <span className="font-mono-custom text-[10px] text-(--ink-mute)">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

const STATUS_COLOR = {
  done: "#4ade80",
  running: "#4F8CFF",
  review: "#E8B14A",
} as const;

const runRows: { step: string; detail: string; status: keyof typeof STATUS_COLOR }[] = [
  { step: "Template extracted", detail: "14 sections, 6 format rules", status: "done" },
  { step: "Compliance matrix", detail: "148 of 148 mapped", status: "done" },
  { step: "Drafting", detail: "Section 12 of 14", status: "running" },
  { step: "Citation check", detail: "188 citations verified so far", status: "running" },
  { step: "Claim check", detail: "2 placeholders to fill", status: "review" },
];

export function RfpOsPanel() {
  return (
    <MockWindow title="rfp-os › mission control › proposal run">
      <div className="flex justify-between items-baseline mb-1">
        <span className="font-mono-custom text-[10px] text-(--ink-mute) tracking-widest uppercase">
          Proposal run · live
        </span>
        <span
          className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded-full"
          style={{
            color: STATUS_COLOR.review,
            background: `color-mix(in oklab,${STATUS_COLOR.review} 14%,transparent)`,
          }}
        >
          ● 2 evidence gaps
        </span>
      </div>
      <div className="text-[36px] font-medium mb-4.5 text-(--foreground) tracking-tight">
        148
        <span className="text-sm text-(--ink-mute) ml-2">requirements extracted</span>
      </div>

      <div className="flex flex-col gap-2">
        {runRows.map((r) => (
          <div key={r.step} className="grid items-center gap-2.5 grid-cols-[1fr_auto]">
            <div className="flex flex-col min-w-0">
              <span className="font-mono-custom text-[11px] text-(--foreground) truncate">
                {r.step}
              </span>
              <span className="font-mono-custom text-[9.5px] text-(--ink-mute)">{r.detail}</span>
            </div>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono-custom"
              style={{
                background: `color-mix(in oklab,${STATUS_COLOR[r.status]} 14%,transparent)`,
                color: STATUS_COLOR[r.status],
              }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}
