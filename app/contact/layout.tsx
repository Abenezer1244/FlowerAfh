import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Schedule a Tour",
  description:
    "Get in touch with Flower Adult Family Home in Everett, WA. Schedule a tour, discuss care options, or ask questions. Call (206) 504-0037.",
  openGraph: {
    title: "Contact Us — Flower Adult Family Home LLC",
    description: "Schedule a tour or discuss care options. Located at 605 74th St SW, Everett, WA.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
