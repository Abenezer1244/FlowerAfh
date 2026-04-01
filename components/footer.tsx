import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-brand-darker text-brand-bg pt-24 pb-12 overflow-hidden z-10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-wider text-brand-muted-dark uppercase mb-16 border-b border-brand-border-dark pb-6 gap-6">
          <span>ESTABLISHED CARE</span>
          <span className="hidden md:inline">Compassion // Dignity // Respect</span>
          <Link
            href="/contact"
            className="hover:text-brand-bg transition-colors bg-brand-bg text-brand-dark px-6 py-3 rounded hover:bg-brand-accent hover:text-brand-bg"
          >
            CONTACT US
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted-dark font-normal gap-6 pt-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span>ALL RIGHTS RETAINED.</span>
            <span>&copy;2024 FLOWER ADULT FAMILY HOME LLC</span>
          </div>
          <div className="text-center flex flex-col gap-1">
            <span>{SITE.addressLine1}</span>
            <span>{SITE.addressLine2}</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-bg transition-colors">FACEBOOK</a>
              <a href="#" className="hover:text-brand-bg transition-colors">DIRECTORIES</a>
            </div>
            <a href="#" className="hover:text-brand-bg transition-colors">TERMS &amp; PRIVACY</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-[0.03] transform translate-y-1/4">
        <h1 className="text-center tracking-tighter text-brand-bg select-none font-display font-normal" style={{ fontSize: "20vw" }}>
          FLOWER
        </h1>
      </div>
    </footer>
  );
}
