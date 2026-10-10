"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

export function TeamLink() {
  return (
    <section className="py-8">
      <div className="site-container">
        <AnimateIn>
          <div className="flex flex-wrap items-center gap-4 text-[15px] text-(--muted)">
            <span>Founded in Coimbra, Portugal. Working with teams worldwide.</span>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-(--accent) hover:text-(--foreground) font-medium transition-colors"
            >
              About the team
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
