"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF8]/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-semibold text-text-heading">
              Flower
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-text-body sm:inline">
              Adult Family Home
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent-green ${
                  pathname === link.href
                    ? "text-accent-green"
                    : "text-text-body"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-full border border-accent-green bg-gradient-to-r from-accent-green to-accent-green-light px-5 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_15px_rgba(45,106,79,0.3)] md:inline-block"
            >
              Schedule a Tour
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5 md:hidden"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-text-heading" />
              <span className="block h-0.5 w-6 bg-text-heading" />
              <span className="block h-0.5 w-4 bg-text-heading" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
