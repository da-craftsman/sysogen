import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ContactForm } from "@/components/ContactForm";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute discovery call with Sysogen. Tell us what you want to automate and we'll tell you honestly whether we're the right fit. No slides.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="site-container max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>Let&apos;s talk</span>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-[1.05] text-(--foreground)">
            Tell us what you
            <br />
            <span className="gradient-text">want to automate.</span>
          </h1>
          <p className="mt-6 text-(--muted) text-[clamp(15px,1.5vw,17px)] leading-[1.65] max-w-2xl">
            We&apos;ll respond within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Left: Book a call */}
          <div className="space-y-6">
            {/* Cal.com embed */}
            <div className="card-base p-10">
              <h2 className="text-[20px] font-semibold mb-3 tracking-tight text-(--foreground)">Book a discovery call</h2>
              <p className="text-[14px] text-(--muted) mb-6 leading-[1.6]">
                First call is free; thirty minutes is enough to tell whether we fit.
              </p>

              <CalendlyButton className="btn-primary">
                Book a free call Now
                <ArrowRight className="w-3.5 h-3.5" />
              </CalendlyButton>
            </div>

            {/* Or send a message */}
            <div className="card-base p-10">
              <h2 className="text-[20px] font-semibold mb-3 tracking-tight text-(--foreground)">Or send a message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-4">
            <div className="card-base p-8">
              <h3 className="text-[16px] font-semibold mb-4 tracking-tight text-(--foreground)">Email us directly</h3>
              <a
                href="mailto:hello@sysogen.com"
                className="inline-flex items-center gap-2 text-(--accent) text-sm hover:underline font-medium"
              >
                <Mail className="w-4 h-4" />
                hello@sysogen.com
              </a>
            </div>

            <div className="card-base p-8">
              <h3 className="text-[16px] font-semibold mb-4 tracking-tight text-(--foreground)">Office</h3>
              <div className="flex items-start gap-2 text-sm text-(--muted)">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-(--ink-mute)" />
                <div>
                  <p className="text-(--foreground) font-medium">SYSOGEN, UNIPESSOAL LDA</p>
                  <p>Coimbra, Portugal</p>
                </div>
              </div>
            </div>

            <div className="card-base p-8 space-y-4">
              <div>
                <div className="font-mono-custom text-[10px] text-(--ink-mute) tracking-[0.12em] uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Response SLA
                </div>
                <p className="text-[14px] text-(--foreground) font-medium">Within one business day.</p>
                <p className="text-[12px] text-(--muted) mt-0.5">Faster for urgent matters: say so in the subject line.</p>
              </div>
              <div>
                <div className="font-mono-custom text-[10px] text-(--ink-mute) tracking-[0.12em] uppercase mb-1.5">
                  Time zones
                </div>
                <p className="text-[14px] text-(--foreground) font-medium">
                  We work remotely with teams worldwide and adapt to your time zone for important calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
