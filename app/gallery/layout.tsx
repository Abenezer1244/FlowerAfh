import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — See Our Home & Community",
  description:
    "Tour our beautiful adult family home through photos of bedrooms, living spaces, dining areas, and community activities in Everett, WA.",
  openGraph: {
    title: "Gallery — Flower Adult Family Home LLC",
    description: "Photo tour of our warm, welcoming senior care home in Everett, WA.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
