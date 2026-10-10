"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";

const navLinks: { label: string; href: string; badge?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", badge: "New" },
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/#approach" },
  { label: "Labs", href: "/labs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/" || href === "/#approach") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";
  const activeUnderline = isDark ? "#4F8CFF" : "#1E3A8A";
  const hoverUnderline = isDark ? "rgba(79,140,255,0.4)" : "rgba(30,58,138,0.28)";
  const hoverBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,138,0.05)";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--background)]/80 backdrop-blur-[14px] border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <AnnouncementBar />
        <div className="site-container">
          <div className="flex items-center justify-between h-16 lg:h-[68px] gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[13.5px] rounded-lg transition-colors duration-150 font-medium group ${
                      active
                        ? "text-[var(--foreground)]"
                        : "text-[var(--ink-dim)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {/* Hover background */}
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{ background: hoverBg }}
                    />

                    <span className="relative">{link.label}</span>
                    {link.badge && <NewBadge label={link.badge} />}

                    {/* Active underline: slides between items via layoutId */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-line"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full pointer-events-none"
                        style={{ background: activeUnderline }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}

                    {/* Hover underline: fades in when not active */}
                    {!active && (
                      <span
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ background: hoverUnderline }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] border border-transparent hover:border-[var(--border)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 text-[13.5px] font-semibold text-white bg-(--accent) hover:bg-[#3a7aff] rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-(--accent)/25 hover:-translate-y-px"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--background)] border-l border-[var(--border)] p-6 overflow-y-auto"
            >
              <div className="mb-8 mt-2">
                <Logo className="h-7 w-auto" />
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 font-medium rounded-lg transition-colors text-sm ${
                        active
                          ? "text-[var(--accent)] bg-[var(--card)] border-l-2 border-[var(--accent)] pl-3.5"
                          : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--card)]"
                      }`}
                    >
                      {link.label}
                      {link.badge && <NewBadge label={link.badge} />}
                    </Link>
                  );
                })}
                <div className="pt-4 mt-3 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-[var(--accent)] rounded-[10px] transition-all text-sm"
                  >
                    Book a Call
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NewBadge({ label }: { label: string }) {
  return (
    <span className="relative ml-1.5 align-middle inline-flex items-center px-1.5 py-px rounded-full text-[9.5px] font-semibold tracking-[0.04em] uppercase text-(--accent) bg-(--accent)/10 border border-(--accent)/25">
      {label}
    </span>
  );
}
