import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story, Team & Values",
  description:
    "Learn about Flower Adult Family Home's mission, our experienced care team, and the values that guide compassionate senior care in Everett, WA.",
  openGraph: {
    title: "About Us — Flower Adult Family Home LLC",
    description: "Our story, care team, and commitment to dignified elder care in Everett, WA.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
