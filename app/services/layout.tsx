import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Senior Care, Memory Care & Respite",
  description:
    "Explore our comprehensive care services: 24/7 assisted living, memory care, respite & recovery, medication management, and more at our Everett, WA home.",
  openGraph: {
    title: "Services — Flower Adult Family Home LLC",
    description: "24/7 assisted living, memory care, respite services, and personalized care plans.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
