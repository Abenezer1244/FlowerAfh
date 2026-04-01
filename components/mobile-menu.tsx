"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/95 flex flex-col items-center justify-center gap-8 lg:hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-brand-bg text-sm font-medium tracking-wider uppercase"
      >
        CLOSE
      </button>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`text-2xl font-display tracking-tight transition-colors ${
            pathname === link.href
              ? "text-brand-accent"
              : "text-brand-bg hover:text-brand-accent"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/contact"
        onClick={onClose}
        className="mt-8 border border-brand-bg text-brand-bg px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-brand-accent hover:border-brand-accent transition-colors"
      >
        SCHEDULE A TOUR
      </Link>
    </div>
  );
}
