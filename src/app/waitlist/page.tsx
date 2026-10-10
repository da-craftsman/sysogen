import type { Metadata } from "next";
import { WaitlistSlot } from "@/components/waitlist/WaitlistSlot";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Join the waitlist for RFP OS, ProveStack and InboxGraph. We're opening access in phases and sending invitations in waves.",
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-3xl">
        <div className="mb-12">
          <span className="eyebrow">Waitlist</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Join the <span className="gradient-text">waitlist.</span>
          </h1>
          <p className="mt-6 text-(--muted) text-[clamp(15px,1.5vw,17px)] leading-[1.65] max-w-2xl">
            Join the waitlist for RFP OS, ProveStack and InboxGraph. We&apos;re opening access in phases. As
            each phase opens, we&apos;ll send invitations in waves until everyone on the waitlist has been
            invited.
          </p>
        </div>

        <div className="card-base p-8 lg:p-10" style={{ borderColor: "rgba(79,140,255,0.3)" }}>
          <WaitlistSlot />
        </div>
      </div>
    </div>
  );
}
