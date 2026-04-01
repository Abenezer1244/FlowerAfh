"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-brand-border lg:px-12">
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "font-medium text-brand-accent"
                  : "font-normal hover:text-brand-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-sm font-medium tracking-wider uppercase"
        >
          MENU
        </button>

        <Link
          href="/contact"
          className="hidden sm:flex items-center gap-1 text-sm font-medium border-b border-brand-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all"
        >
          SCHEDULE A TOUR{" "}
          <iconify-icon
            icon="solar:arrow-right-up-linear"
            width="16"
            height="16"
            style={{ strokeWidth: "1.5px" } as React.CSSProperties}
          />
        </Link>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
