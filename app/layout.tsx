import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Flower Adult Family Home LLC | Compassionate Senior Care in Everett, WA",
    template: "%s | Flower Adult Family Home LLC",
  },
  description:
    "Licensed Adult Family Home in Everett, WA providing 24/7 personalized senior care, memory care, and respite services. Up to 6 residents in a warm, homelike setting.",
  keywords: [
    "adult family home Everett WA",
    "senior care Everett",
    "memory care Washington",
    "assisted living Everett",
    "respite care Snohomish County",
    "elder care near me",
    "adult family home near me",
  ],
  authors: [{ name: "Flower Adult Family Home LLC" }],
  openGraph: {
    title: "Flower Adult Family Home LLC | Compassionate Senior Care in Everett, WA",
    description:
      "Licensed Adult Family Home in Everett, WA providing 24/7 personalized senior care, memory care, and respite services.",
    url: "https://flowerafh.com",
    siteName: "Flower Adult Family Home LLC",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://flowerafh.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          defer
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AssistedLivingFacility",
              name: "Flower Adult Family Home LLC",
              description:
                "Licensed Adult Family Home in Everett, WA providing 24/7 personalized senior care, memory care, and respite services in a warm, homelike setting.",
              url: "https://flowerafh.com",
              telephone: ["(206) 504-0037", "(206) 313-1516"],
              email: "abeba@flowerafh.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "605 74th St SW",
                addressLocality: "Everett",
                addressRegion: "WA",
                postalCode: "98203",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.8901,
                longitude: -122.2418,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday", "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              numberOfBeds: 6,
              availableService: [
                "Assisted Living",
                "Memory Care",
                "Respite Care",
                "Medication Management",
                "24/7 Personal Care",
              ],
              areaServed: {
                "@type": "City",
                name: "Everett",
                containedInPlace: {
                  "@type": "State",
                  name: "Washington",
                },
              },
            }),
          }}
        />
      </head>
      <body className="bg-brand-bg text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
