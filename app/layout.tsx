import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flower Adult Family Home",
  description:
    "Compassionate, personalized care in a warm residential setting in Lynnwood, WA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Inter + Google Sans Flex */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Iconify CDN */}
        <script src="https://code.iconify.design/3/3.1.0/iconify.min.js" async />
      </head>
      <body className="bg-brand-bg text-brand-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
