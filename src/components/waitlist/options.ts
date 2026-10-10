// Shared by the waitlist form (client) and /api/waitlist (server).

export type WaitlistProduct = "rfp-os" | "provestack" | "inboxgraph";

export const WAITLIST_PRODUCTS: { id: WaitlistProduct; label: string }[] = [
  { id: "rfp-os", label: "RFP OS" },
  { id: "provestack", label: "ProveStack" },
  { id: "inboxgraph", label: "InboxGraph" },
];

export const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

export const NOTE_MAX_CHARS = 1000;
