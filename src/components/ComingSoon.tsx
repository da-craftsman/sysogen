"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { CalendlyButton } from "@/components/CalendlyButton";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function ComingSoon({ title }: { title: string }) {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 400], [0, -80]);
  const blobScale = useTransform(scrollY, [0, 400], [1, 1.2]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />

      {/* Parallax glow blob */}
      <motion.div
        style={{ y: blobY, scale: blobScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        // inline style for the blur because Tailwind purges arbitrary blur values
        // when applied via motion.div className
        // eslint-disable-next-line react/forbid-dom-props
      >
        <div className="w-full h-full bg-[var(--accent)]/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* Card content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative text-center max-w-2xl mx-auto px-6"
      >
        {/* Icon */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <motion.div
            className="p-4 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20"
            initial={{ scale: 0.6, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.2 }}
          >
            <Clock className="w-8 h-8 text-[var(--accent)]" />
          </motion.div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p variants={item} className="eyebrow mb-4">
          Coming soon
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-5 leading-tight"
        >
          Our{" "}
          <span className="gradient-text">"{title}"</span>
          <br />
          page is on the way.
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-[var(--muted)] text-lg mb-10 leading-relaxed"
        >
          We're putting the finishing touches on this page. In the meantime,
          feel free to reach out. We're always happy to chat.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CalendlyButton className="btn-primary">
            Book a Discovery Call
          </CalendlyButton>
          <Link
            href="/"
            className="btn-ghost flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
