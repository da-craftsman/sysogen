"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "announce-rfp-os-dismissed";

function readDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function isHiddenOn(pathname: string): boolean {
  return (
    pathname === "/products/rfp-os" ||
    pathname.startsWith("/products/rfp-os/") ||
    pathname === "/waitlist" ||
    pathname.startsWith("/waitlist/")
  );
}

export function AnnouncementBar() {
  const pathname = usePathname();
  const storedDismissed = useSyncExternalStore(subscribe, readDismissed, () => false);
  const [dismissed, setDismissed] = useState(false);

  const visible = !dismissed && !storedDismissed && !isHiddenOn(pathname);

  // Pushes page content down by the bar height (see globals.css)
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.setAttribute("data-announce", "");
    else root.removeAttribute("data-announce");
  }, [visible]);

  if (!visible) return null;

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  return (
    <div className="h-9 bg-(--accent) text-white">
      <div className="site-container h-full flex items-center justify-center gap-3 relative">
        <Link
          href="/products/rfp-os#waitlist"
          className="text-[12.5px] font-medium truncate hover:underline underline-offset-4 pr-8"
        >
          <span className="hidden sm:inline">
            Meet RFP OS: proposal automation from solicitation to cited draft.{" "}
          </span>
          <span className="sm:hidden">Meet RFP OS. </span>
          <span className="font-semibold">Join the waitlist →</span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 sm:right-6 p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
