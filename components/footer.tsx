import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-gray-300">
      {/* Gold accent line */}
      <div className="h-px bg-accent-gold/40" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-accent-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>{SITE.address}</li>
              <li>
                <a href={`tel:${SITE.phone1.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-gold">
                  {SITE.phone1}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone2.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-gold">
                  {SITE.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent-gold">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">
              Hours
            </h3>
            <p className="text-sm">Available 24/7 for inquiries</p>
            <p className="text-sm">Tours by appointment</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="mt-1">{SITE.license}</p>
        </div>
      </div>
    </footer>
  );
}
