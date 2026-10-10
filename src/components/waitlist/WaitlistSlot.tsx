"use client";

import { ArrowRight } from "lucide-react";

export type WaitlistProduct = "rfp-os" | "provestack" | "inboxgraph";

export const WAITLIST_PRODUCTS: { id: WaitlistProduct; label: string }[] = [
  { id: "rfp-os", label: "RFP OS" },
  { id: "provestack", label: "ProveStack" },
  { id: "inboxgraph", label: "InboxGraph" },
];

/**
 * Single mount point for the waitlist form. Every waitlist location on the site
 * (home, /waitlist, /products/rfp-os, /labs/provestack, /labs/inboxgraph) renders
 * this component, so the Clerk waitlist only has to be wired in here.
 *
 * Not connected yet: until Clerk is set up, this falls back to a prefilled email.
 * `preselect` is the product the page is about, to pass on to the real form.
 */
export function WaitlistSlot({ preselect }: { preselect?: WaitlistProduct }) {
  const product = WAITLIST_PRODUCTS.find((p) => p.id === preselect);
  const subject = product ? `Waitlist: ${product.label}` : "Waitlist";
  const body =
    "Full name:%0ACompany:%0ARole:%0ACompany size:%0AProducts (RFP OS, ProveStack, InboxGraph):%0AAnything you'd like us to know?";

  return (
    <div data-waitlist-slot={preselect ?? "all"}>
      <a
        href={`mailto:hello@sysogen.com?subject=${encodeURIComponent(subject)}&body=${body}`}
        className="btn-primary"
      >
        Join the waitlist
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
      <p className="mt-4 text-[12px] text-(--ink-mute)">
        We&apos;ll reply within one business day.
      </p>
    </div>
  );
}
