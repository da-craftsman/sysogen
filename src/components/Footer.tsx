"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";

const footerCols = [
  {
    h: "Services",
    items: [
      { label: "AI Automation & Engineering", href: "/services/custom-solutions" },
      { label: "Production Engineering", href: "/services/engineering" },
      { label: "AI Adoption & Governance", href: "/services/governance" },
    ],
  },
  {
    h: "Products",
    items: [
      { label: "RFP OS", href: "/products/rfp-os" },
      { label: "Join the waitlist", href: "/waitlist" },
    ],
  },
  {
    h: "Labs",
    items: [
      { label: "ProveStack", href: "/labs/provestack" },
      { label: "InboxGraph", href: "/labs/inboxgraph" },
    ],
  },
  {
    h: "Company",
    items: [
      { label: "Home", href: "/" },
      { label: "How we work", href: "/#approach" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    h: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Imprint", href: "/imprint" },
    ],
  },
];

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lightStyle = {
    background: "#0D1F47",
    "--foreground": "#EEF3FF",
    "--muted": "rgba(190,210,255,0.72)",
    "--ink-dim": "rgba(200,218,255,0.8)",
    "--ink-mute": "rgba(150,180,255,0.5)",
    "--border": "rgba(255,255,255,0.09)",
    "--border-strong": "rgba(255,255,255,0.16)",
  } as React.CSSProperties;

  return (
    <footer
      className="border-t border-(--border)"
      style={isDark ? { background: "rgba(7,9,15,0.6)" } : lightStyle}
    >
      <div className="site-container py-16 pb-7">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)] gap-10 mb-14">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-3.5">
              <Logo className="h-7 w-auto" forceWhite={!isDark} />
            </Link>
            <p className="text-(--muted) text-sm leading-relaxed max-w-70">
              AI automation for the work nobody wants to do. Sysogen builds AI
              products and custom automation. Founded in Coimbra, Portugal.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/sysogen",
                  icon: (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18V10.13H5.67V18zm-1.34-9a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.5 18v-4.74c0-2.4-1.28-3.52-3-3.52a2.59 2.59 0 0 0-2.34 1.29h-.04V10.13h-2.55V18h2.66v-3.9c0-1.03.2-2.03 1.47-2.03s1.27 1.18 1.27 2.1V18z" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  href: "https://github.com/sysogen",
                  icon: (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.64.71 1.03 1.61 1.03 2.71 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-(--border-strong) text-(--muted) hover:text-(--foreground) hover:border-(--accent)/40 flex items-center justify-center transition-all duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.h}>
              <div className="font-mono-custom text-[10.5px] tracking-[0.14em] text-(--ink-mute) uppercase mb-4">
                {col.h}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13.5px] text-(--ink-dim) hover:text-(--foreground) transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-(--border) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono-custom text-[11px] text-(--ink-mute) tracking-[0.04em]">
            © 2026 SYSOGEN, UNIPESSOAL LDA · NIF 519018265 · Coimbra, Portugal
          </p>
        </div>
      </div>
    </footer>
  );
}
