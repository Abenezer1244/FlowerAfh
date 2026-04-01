# Flower AFH Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hyper-premium, cinematic scrollytelling website for Flower Adult Family Homes using Next.js 14 + Tailwind CSS + Framer Motion, deployed on Vercel.

**Architecture:** Next.js 14 App Router with 5 page routes. Shared layout provides navbar + footer. Scroll-driven animations via Framer Motion `useScroll`/`useTransform`. All images served from `/public/images/` via Next.js `<Image>`. Contact form submits to Web3Forms API.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, next/font (Playfair Display + Inter), Web3Forms, Vercel deployment.

---

## File Structure

```
app/
  layout.tsx              — Root layout: fonts, metadata, navbar, footer
  page.tsx                — Home page: 5-beat scrollytelling
  about/page.tsx          — About Us page
  services/page.tsx       — Services page
  gallery/page.tsx        — Gallery page (client component)
  contact/page.tsx        — Contact Us page
  globals.css             — Tailwind directives + custom CSS
components/
  navbar.tsx              — Sticky glassmorphism navbar (client component)
  mobile-menu.tsx         — Full-screen mobile menu overlay (client component)
  footer.tsx              — Site-wide footer (server component)
  scroll-section.tsx      — Reusable scroll-animated wrapper (client component)
  image-crossfade.tsx     — Scroll-driven image crossfade sequence (client component)
  parallax-image.tsx      — Ken Burns parallax image (client component)
  service-card.tsx        — Photo-backed service card (server component)
  gallery-grid.tsx        — Masonry grid with filtering (client component)
  lightbox.tsx            — Full-screen image viewer (client component)
  contact-form.tsx        — Web3Forms contact form (client component)
  value-card.tsx          — Core values card (server component)
  team-card.tsx           — Caregiver profile card (server component)
lib/
  constants.ts            — Brand data: contact info, services, team, values, image paths
public/
  images/
    hero/                 — Hero and exterior shots
    bedrooms/             — Bedroom photography
    bathrooms/            — Bathroom photography
    dining/               — Dining room photography
    living/               — Living spaces photography
    community/            — Caregiver, resident, activity photos
tailwind.config.ts        — Custom colors, fonts, extended theme
next.config.ts            — Image domains, output config
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx` (minimal placeholder)
- Create: `lib/constants.ts`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
cd "C:/Users/Windows/OneDrive - Seattle Colleges/Desktop/FlowerAfh"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Expected: Project scaffolded with `app/` directory, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install framer-motion
```

Expected: `framer-motion` added to `package.json` dependencies.

- [ ] **Step 3: Configure Tailwind with brand colors and fonts**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#FAFAF8",
        "bg-dark": "#080806",
        "bg-card": "#F4F1EC",
        "bg-warm-blush": "#F5EDE0",
        "text-heading": "#1A1A18",
        "text-body": "#4A4A48",
        "accent-green": "#2D6A4F",
        "accent-green-light": "#52B788",
        "accent-gold": "#C9A84C",
        "border-warm": "#E8E4DE",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Configure next.config.ts**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Set up globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-primary text-text-body antialiased;
  }

  ::selection {
    @apply bg-accent-green/20 text-text-heading;
  }
}
```

- [ ] **Step 6: Create lib/constants.ts with all brand data**

Create `lib/constants.ts`:

```ts
export const SITE = {
  name: "Flower Adult Family Homes",
  tagline: "Where Every Day Feels Like Home",
  description:
    "A licensed Adult Family Home serving Everett, Washington — compassionate care, warm spaces, and dignity in every detail.",
  address: "605 74th St SW, Everett, WA 98203",
  phone1: "(206) 504-0037",
  phone2: "(206) 313-1516",
  email: "abeba@flowerafh.com",
  hours: "Available 24/7 for inquiries | Tours by appointment",
  license: "Licensed Adult Family Home — Washington State",
  capacity: "Up to 6 Residents",
  web3formsKey: "cd9bdd93-9d53-4559-9d71-340c10af26dc",
  mapQuery: "605+74th+St+SW+Everett+WA+98203",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export const SERVICES = [
  {
    title: "Personal Care & ADL Assistance",
    description:
      "Bathing, dressing, grooming, and daily routines — handled with patience and respect.",
    image: "/images/bathrooms/bathroom-01.jpg",
  },
  {
    title: "Medication Management",
    description:
      "Accurate, timely medication administration overseen by trained caregivers.",
    image: "/images/bedrooms/bedroom-01.jpg",
  },
  {
    title: "Nutritious Home-Cooked Meals",
    description:
      "Fresh, balanced meals prepared daily — with cultural and dietary preferences honored.",
    image: "/images/dining/dining-01.jpg",
  },
  {
    title: "Mobility & Fall Prevention",
    description:
      "Safe transfers, walking assistance, and an environment designed to prevent falls.",
    image: "/images/bedrooms/bedroom-02.jpg",
  },
  {
    title: "Memory Care & Cognitive Support",
    description:
      "Specialized routines and engagement for residents living with dementia or Alzheimer's.",
    image: "/images/community/activities-01.jpg",
  },
  {
    title: "Social Activities & Engagement",
    description:
      "Games, music, conversation, and community — because connection is care.",
    image: "/images/community/games-01.jpg",
  },
  {
    title: "24/7 Caregiver Availability",
    description:
      "Round-the-clock presence so no one is ever alone when they need support.",
    image: "/images/community/caregiver-01.jpg",
  },
  {
    title: "Transportation & Appointments",
    description:
      "Rides to medical visits, errands, and outings — coordinated and stress-free.",
    image: "/images/hero/exterior-01.jpg",
  },
];

export const VALUES = [
  {
    title: "Dignity",
    description:
      "Every person deserves respect, privacy, and choice — no matter their age or condition.",
    icon: "shield",
  },
  {
    title: "Safety",
    description:
      "A secure, accessible environment designed to prevent harm and promote confidence.",
    icon: "lock",
  },
  {
    title: "Family",
    description:
      "This is a home, not a facility. Residents are family, and families are always welcome.",
    icon: "heart",
  },
  {
    title: "Joy",
    description:
      "Meaningful activities, warm meals, and genuine connection — because happiness is essential to health.",
    icon: "sun",
  },
];

export const TEAM = [
  {
    name: "Tesfaye",
    role: "Co-Founder & Operator",
    bio: "Driven by faith and a lifelong commitment to elder care.",
    image: "/images/community/caregiver-01.jpg",
  },
  {
    name: "Abeba",
    role: "Co-Founder & Care Director",
    bio: "Brings warmth, compassion, and hands-on care to every resident.",
    image: "/images/community/caregiver-02.jpg",
  },
  {
    name: "Care Team Member",
    role: "Caregiver",
    bio: "Dedicated to providing personalized, dignified daily support.",
    image: "/images/community/caregiver-03.jpg",
  },
];

export const TRUST_BADGES = [
  { label: "Washington State Licensed", value: "" },
  { label: "Years of Experience", value: "5+" },
  { label: "Resident Capacity", value: "Up to 6" },
  { label: "Caregiver Availability", value: "24/7" },
];

export type GalleryCategory =
  | "all"
  | "bedrooms"
  | "bathrooms"
  | "dining"
  | "living"
  | "community";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // Bedrooms
  { src: "/images/bedrooms/bedroom-01.jpg", alt: "Spacious private bedroom with natural light", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-02.jpg", alt: "Comfortable bedroom with warm decor", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-03.jpg", alt: "Cozy bedroom with accessibility features", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-04.jpg", alt: "Well-appointed guest bedroom", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-05.jpg", alt: "Bright bedroom with garden view", category: "bedrooms" },
  // Bathrooms
  { src: "/images/bathrooms/bathroom-01.jpg", alt: "Clean, accessible bathroom with safety features", category: "bathrooms" },
  { src: "/images/bathrooms/bathroom-02.jpg", alt: "Spa-inspired bathroom with warm fixtures", category: "bathrooms" },
  { src: "/images/bathrooms/bathroom-03.jpg", alt: "Modern bathroom with grab bars", category: "bathrooms" },
  // Dining
  { src: "/images/dining/dining-01.jpg", alt: "Elegant dining table set for a family meal", category: "dining" },
  { src: "/images/dining/dining-02.jpg", alt: "Warm dining area with natural light", category: "dining" },
  // Living Spaces
  { src: "/images/living/living-01.jpg", alt: "Spacious living room with comfortable seating", category: "living" },
  { src: "/images/living/living-02.jpg", alt: "Bright common area for relaxation", category: "living" },
  { src: "/images/living/living-03.jpg", alt: "Welcoming entryway and sitting area", category: "living" },
  { src: "/images/living/living-04.jpg", alt: "Cozy fireplace lounge", category: "living" },
  { src: "/images/living/living-05.jpg", alt: "Sunlit reading nook", category: "living" },
  // Community
  { src: "/images/community/activities-01.jpg", alt: "Residents enjoying social activities", category: "community" },
  { src: "/images/community/games-01.jpg", alt: "Seniors playing engaging games together", category: "community" },
  { src: "/images/community/caregiver-01.jpg", alt: "Caregiver sharing a warm moment with resident", category: "community" },
  { src: "/images/community/caregiver-02.jpg", alt: "Compassionate one-on-one care", category: "community" },
  { src: "/images/community/caregiver-03.jpg", alt: "Team member assisting with daily activities", category: "community" },
  { src: "/images/community/group-01.jpg", alt: "Group dining moment", category: "community" },
  // Hero / Exterior
  { src: "/images/hero/exterior-01.jpg", alt: "Flower Adult Family Home exterior", category: "living" },
  { src: "/images/hero/exterior-02.jpg", alt: "Beautiful home entrance with landscaping", category: "living" },
  { src: "/images/hero/hero-living.jpg", alt: "Warm living room hero shot", category: "living" },
];

export const GALLERY_CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "All", value: "all" },
  { label: "Bedrooms", value: "bedrooms" },
  { label: "Bathrooms", value: "bathrooms" },
  { label: "Dining", value: "dining" },
  { label: "Living Spaces", value: "living" },
  { label: "Community", value: "community" },
];

export const RELATIONSHIP_OPTIONS = [
  "I am the resident",
  "Son/Daughter",
  "Spouse",
  "Other Family Member",
  "Professional/Case Manager",
  "Other",
];
```

- [ ] **Step 7: Set up root layout with fonts**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Create minimal placeholder home page**

Replace `app/page.tsx` with:

```tsx
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-serif text-4xl text-text-heading">
        Flower Adult Family Homes
      </h1>
    </div>
  );
}
```

- [ ] **Step 9: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000`, shows the placeholder heading with Playfair Display font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with Tailwind, Framer Motion, and brand config"
```

---

### Task 2: Download & Organize Images

**Files:**
- Create: `public/images/hero/` (multiple images)
- Create: `public/images/bedrooms/` (multiple images)
- Create: `public/images/bathrooms/` (multiple images)
- Create: `public/images/dining/` (multiple images)
- Create: `public/images/living/` (multiple images)
- Create: `public/images/community/` (multiple images)

- [ ] **Step 1: Create image directories**

Run:
```bash
cd "C:/Users/Windows/OneDrive - Seattle Colleges/Desktop/FlowerAfh"
mkdir -p public/images/{hero,bedrooms,bathrooms,dining,living,community}
```

- [ ] **Step 2: Download all images from imgbb and save with descriptive names**

Run this script to download all images:

```bash
cd "C:/Users/Windows/OneDrive - Seattle Colleges/Desktop/FlowerAfh"

# Hero / Exterior
curl -L -o public/images/hero/hero-living.jpg "https://i.ibb.co/Kc8t7jX9/0ddbadba006a773a415a16a2d814da35-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/hero/exterior-01.jpg "https://i.ibb.co/6JVy48L6/0664c71c16af7db24b96ead62f983742-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/hero/exterior-02.jpg "https://i.ibb.co/rKSNFgxs/9980a06e3da7384cfb7990154b6e0fff-uncropped-scaled-within-1344-1008.webp"

# Bedrooms
curl -L -o public/images/bedrooms/bedroom-01.jpg "https://i.ibb.co/C5MCKdKZ/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bedroom-IMGL0025-2-2000x1333.jpg"
curl -L -o public/images/bedrooms/bedroom-02.jpg "https://i.ibb.co/SXHNtVbj/1-1.webp"
curl -L -o public/images/bedrooms/bedroom-03.jpg "https://i.ibb.co/Jw886v9n/1.webp"
curl -L -o public/images/bedrooms/bedroom-04.jpg "https://i.ibb.co/s969MGyd/1c3c84141a33e0cced2283b645658d87-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/bedrooms/bedroom-05.jpg "https://i.ibb.co/cKMgrBgP/3ef7a64d0ed08504da4b3024d11ed8c0-uncropped-scaled-within-1344-1008.webp"

# Bathrooms
curl -L -o public/images/bathrooms/bathroom-01.jpg "https://i.ibb.co/nMX1kJnX/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0019-2-740x493.jpg"
curl -L -o public/images/bathrooms/bathroom-02.jpg "https://i.ibb.co/0RYPdtLb/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0022-2.jpg"
curl -L -o public/images/bathrooms/bathroom-03.jpg "https://i.ibb.co/DDPqq0SP/7afa51fe0c3e318f09fe6b0cb799ca04-uncropped-scaled-within-1344-1008.webp"

# Dining
curl -L -o public/images/dining/dining-01.jpg "https://i.ibb.co/F4qtN9vR/180-2nd-Ave-S-Edmonds-WA-98020-USA-Dining-room-IMGL0019-2000x1333.jpg"
curl -L -o public/images/dining/dining-02.jpg "https://i.ibb.co/j95N77wd/25ff525ad894d80b71ac19f0f87ebf1a-uncropped-scaled-within-1344-1008.webp"

# Living Spaces
curl -L -o public/images/living/living-01.jpg "https://i.ibb.co/prndgr1y/7c6e8e85eebffa55d2bdcdbae9877f05-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-02.jpg "https://i.ibb.co/JwyWYTrd/7eba510eb53b95c3539a3274b10a1e87-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-03.jpg "https://i.ibb.co/VcB2C1j6/9c4c1db4ce6c4159633f27fd9259a39e-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-04.jpg "https://i.ibb.co/7xwZXtZ7/9ee9b50d5a03c530707b40ae10e1e5fd-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-05.jpg "https://i.ibb.co/5XXcZ9GQ/36d354edd8bc5454dec3c721f38065be-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-06.jpg "https://i.ibb.co/R4zqt1Qv/35148c286add27d447b3f47de8d63e36-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-07.jpg "https://i.ibb.co/FqkykfVp/a75018ea2db14ad6a04df57fc1851daa-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-08.jpg "https://i.ibb.co/kVWkpWMy/bb05900f6d09d9a45e229bb4b123d884-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-09.jpg "https://i.ibb.co/4ZWVCtKm/c0ac88a48a0d4319319a25fc8be9071d-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-10.jpg "https://i.ibb.co/8D5hV51C/c009d933140daa0498fb9471134fe02a-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-11.jpg "https://i.ibb.co/N2tWbqTf/cb81fd5c76159a7fc851ff00d4cb799f-uncropped-scaled-within-1344-1008.webp"
curl -L -o public/images/living/living-12.jpg "https://i.ibb.co/VcqdHKDB/dea4a7f20233bfa440ac8ed343980426-uncropped-scaled-within-1344-1008.webp"

# Community
curl -L -o public/images/community/activities-01.jpg "https://i.ibb.co/7N6MRysd/229071-tiny.jpg"
curl -L -o public/images/community/games-01.jpg "https://i.ibb.co/4wq736YX/engaging-games-for-seniors-1080x675.jpg"
curl -L -o public/images/community/caregiver-01.jpg "https://i.ibb.co/hRFN7nY1/gettyimages-1633393933-640x640.jpg"
curl -L -o public/images/community/caregiver-02.jpg "https://i.ibb.co/fd8tXxvH/istockphoto-638886566-612x612.jpg"
curl -L -o public/images/community/caregiver-03.jpg "https://i.ibb.co/XZtxZGTj/istockphoto-2163703602-612x612.jpg"
curl -L -o public/images/community/group-01.jpg "https://i.ibb.co/gM9X7wp4/Blog-Company-News.png"
```

Expected: All ~30 images downloaded to their respective directories.

- [ ] **Step 3: Verify images downloaded**

Run:
```bash
find public/images -type f | sort
```

Expected: ~30 image files listed across the 6 subdirectories.

- [ ] **Step 4: Commit**

```bash
git add public/images/
git commit -m "feat: add all property and community photography organized by category"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `components/navbar.tsx`
- Create: `components/mobile-menu.tsx`

- [ ] **Step 1: Create the navbar component**

Create `components/navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF8]/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-semibold text-text-heading">
              Flower
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-text-body sm:inline">
              Adult Family Home
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent-green ${
                  pathname === link.href
                    ? "text-accent-green"
                    : "text-text-body"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-full border border-accent-green bg-gradient-to-r from-accent-green to-accent-green-light px-5 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_15px_rgba(45,106,79,0.3)] md:inline-block"
            >
              Schedule a Tour
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5 md:hidden"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-text-heading" />
              <span className="block h-0.5 w-6 bg-text-heading" />
              <span className="block h-0.5 w-4 bg-text-heading" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Create the mobile menu component**

Create `components/mobile-menu.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-lg"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-text-heading"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`font-serif text-3xl transition-colors hover:text-accent-green ${
                    pathname === link.href
                      ? "text-accent-green"
                      : "text-text-heading"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-4 inline-block rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-lg font-medium text-white"
              >
                Schedule a Tour
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Verify navbar renders**

Run `npm run dev`, open `http://localhost:3000`. Verify:
- Logo shows on left
- Nav links centered (desktop) or hamburger (mobile)
- "Schedule a Tour" button on right
- Scroll down: glassmorphism background fades in
- Hamburger opens full-screen overlay on mobile widths

- [ ] **Step 4: Commit**

```bash
git add components/navbar.tsx components/mobile-menu.tsx
git commit -m "feat: add sticky glassmorphism navbar with mobile menu"
```

---

### Task 4: Footer Component

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Create the footer component**

Create `components/footer.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify footer renders**

Run `npm run dev`. Scroll to bottom. Verify: warm charcoal background, gold accent line, three columns, bottom copyright bar.

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add warm charcoal footer with contact info, links, and hours"
```

---

### Task 5: Reusable Animation Components

**Files:**
- Create: `components/scroll-section.tsx`
- Create: `components/parallax-image.tsx`
- Create: `components/image-crossfade.tsx`

- [ ] **Step 1: Create scroll-section wrapper**

Create `components/scroll-section.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function ScrollSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionOffset = {
    up: { x: 0, y: 40 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : {
              opacity: 0,
              x: directionOffset[direction].x,
              y: directionOffset[direction].y,
            }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create parallax-image component**

Create `components/parallax-image.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  overlay?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
  overlay = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/60" />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create image-crossfade component**

Create `components/image-crossfade.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface CrossfadeImage {
  src: string;
  alt: string;
}

interface ImageCrossfadeProps {
  images: CrossfadeImage[];
  className?: string;
}

export function ImageCrossfade({ images, className = "" }: ImageCrossfadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {images.map((image, index) => {
        const start = index / images.length;
        const peak = (index + 0.5) / images.length;
        const end = (index + 1) / images.length;

        return (
          <CrossfadeLayer
            key={image.src}
            image={image}
            scrollYProgress={scrollYProgress}
            start={start}
            peak={peak}
            end={end}
            isFirst={index === 0}
          />
        );
      })}
    </div>
  );
}

function CrossfadeLayer({
  image,
  scrollYProgress,
  start,
  peak,
  end,
  isFirst,
}: {
  image: CrossfadeImage;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  peak: number;
  end: number;
  isFirst: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [start, peak, end] : [start, peak, end],
    isFirst ? [1, 1, 0] : [0, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.05]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 will-change-[transform,opacity]"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  );
}
```

- [ ] **Step 4: Verify components import correctly**

Run `npm run dev`. No errors in console. Components are importable (they'll be used in subsequent tasks).

- [ ] **Step 5: Commit**

```bash
git add components/scroll-section.tsx components/parallax-image.tsx components/image-crossfade.tsx
git commit -m "feat: add reusable scroll-section, parallax-image, and image-crossfade components"
```

---

### Task 6: Home Page — Scrollytelling

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the full home page with all 5 scroll beats**

Replace `app/page.tsx` with:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ScrollSection } from "@/components/scroll-section";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Beat 1: Hero (0–15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);

  // Beat 2: Care Reveal crossfade images (15–40%)
  const img2aOpacity = useTransform(scrollYProgress, [0.14, 0.18, 0.24, 0.28], [0, 1, 1, 0]);
  const img2bOpacity = useTransform(scrollYProgress, [0.24, 0.28, 0.34, 0.38], [0, 1, 1, 0]);
  const img2cOpacity = useTransform(scrollYProgress, [0.34, 0.38, 0.40, 0.40], [0, 1, 1, 1]);
  const beat2TextOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);
  const beat2TextX = useTransform(scrollYProgress, [0.16, 0.22], [-40, 0]);

  // Beat 3: Care & Community (40–65%)
  const beat3Opacity = useTransform(scrollYProgress, [0.38, 0.42, 0.62, 0.65], [0, 1, 1, 0]);
  const beat3TextX = useTransform(scrollYProgress, [0.42, 0.48], [40, 0]);

  // Beat 4: Home Quality (65–85%)
  const beat4Opacity = useTransform(scrollYProgress, [0.63, 0.67, 0.82, 0.85], [0, 1, 1, 0]);

  // Beat 5: CTA (85–100%)
  const beat5Opacity = useTransform(scrollYProgress, [0.83, 0.88], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ===== BEAT 1: Hero ===== */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image
              src="/images/hero/hero-living.jpg"
              alt="Warm living room at Flower Adult Family Home"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-4xl font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-7xl"
            >
              Where Every Day Feels Like Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl"
            >
              Compassionate care. Warm spaces. Dignity in every detail.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-2 text-sm text-white/70 sm:text-base"
            >
              A licensed Adult Family Home serving Everett, Washington — where
              your loved one is family.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Learn About Our Care
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-60"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== BEAT 2: Care Reveal ===== */}
        <motion.div
          style={{ opacity: img2aOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/dining/dining-01.jpg"
            alt="Elegant dining room"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: img2bOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/bedrooms/bedroom-01.jpg"
            alt="Comfortable bedroom"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: img2cOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/bathrooms/bathroom-01.jpg"
            alt="Clean accessible bathroom"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Beat 2 copy */}
        <motion.div
          style={{ opacity: beat2TextOpacity, x: beat2TextX }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-16 pt-32"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Thoughtfully designed for comfort and safety.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Every room crafted with accessibility, warmth, and dignity — from
              wide-doorframe bedrooms to spa-inspired bathrooms.
            </p>
            <p className="mt-2 text-sm text-white/60">
              Our home is their home. Every detail matters.
            </p>
          </div>
        </motion.div>

        {/* ===== BEAT 3: Care & Community ===== */}
        <motion.div
          style={{ opacity: beat3Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/community/games-01.jpg"
            alt="Seniors enjoying activities together"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          <motion.div
            style={{ x: beat3TextX }}
            className="absolute inset-0 flex items-center justify-end px-6"
          >
            <div className="max-w-lg text-right">
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Care that goes beyond the clinical.
              </h2>
              <ul className="mt-6 space-y-3 text-lg text-white/80">
                <li>Personalized care plans tailored to each resident.</li>
                <li>
                  24/7 caregiver presence — never alone, always supported.
                </li>
                <li>
                  Activities, meals, and moments designed to bring joy.
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* ===== BEAT 4: Home Quality ===== */}
        <motion.div
          style={{ opacity: beat4Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bathrooms/bathroom-02.jpg"
            alt="Pristine bathroom with modern fixtures"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              A home built for living well.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Licensed, inspected, and lovingly maintained — our spaces meet the
              highest Washington State AFH standards while feeling like a true
              home.
            </p>
          </div>
        </motion.div>

        {/* ===== BEAT 5: CTA ===== */}
        <motion.div
          style={{ opacity: beat5Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/community/caregiver-01.jpg"
            alt="Caregiver sharing a warm moment"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your family deserves the very best.
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Let&apos;s talk about care that feels like family.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Contact Us Today
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Serving families across Everett and surrounding Washington
              communities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify home page scrollytelling**

Run `npm run dev`. Navigate to `http://localhost:3000`. Scroll slowly through the page. Verify:
- Beat 1: Hero with Ken Burns zoom, staggered text entry, scroll chevron
- Beat 2: Crossfade through dining → bedroom → bathroom with left-aligned copy
- Beat 3: Community photo with right-aligned copy and bullet points
- Beat 4: Centered quality message over bathroom photo
- Beat 5: CTA section with caregiver photo

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build home page with 5-beat scroll-driven storytelling"
```

---

### Task 7: About Us Page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/value-card.tsx`
- Create: `components/team-card.tsx`

- [ ] **Step 1: Create value-card component**

Create `components/value-card.tsx`:

```tsx
interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  lock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  heart: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  sun: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
};

export function ValueCard({ title, description, icon }: ValueCardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 text-accent-green">{icons[icon]}</div>
      <h3 className="font-serif text-xl font-semibold text-text-heading">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-body">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create team-card component**

Create `components/team-card.tsx`:

```tsx
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <div className="group rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg font-semibold text-text-heading">
          {name}
        </h3>
        <p className="text-sm font-medium text-accent-green">{role}</p>
        <p className="mt-1 text-sm text-text-body">{bio}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Build the About Us page**

Create `app/about/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ScrollSection } from "@/components/scroll-section";
import { ParallaxImage } from "@/components/parallax-image";
import { ValueCard } from "@/components/value-card";
import { TeamCard } from "@/components/team-card";
import { VALUES, TEAM, TRUST_BADGES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh]">
        <ParallaxImage
          src="/images/hero/exterior-01.jpg"
          alt="Flower Adult Family Home exterior"
          className="h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="max-w-3xl text-center font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Built on compassion. Driven by purpose.
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollSection direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/community/caregiver-02.jpg"
                alt="Tesfaye and Abeba"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollSection>

          <ScrollSection direction="right">
            <h2 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-text-body">
              <p>
                Tesfaye and Abeba came to America from Ethiopia carrying little
                more than their faith and a dream. The years that followed were
                far from easy — long hours, language barriers, the quiet weight
                of starting over in an unfamiliar place.
              </p>
              <p>
                But through every hardship, two things sustained them: a deep
                trust in God&apos;s plan, and a cultural value they carried from
                home — that caring for elders is sacred. In Ethiopian tradition,
                you don&apos;t send your parents away. You bring them closer. You
                honor them.
              </p>
              <p>
                That calling led them to open Flower Adult Family Home. Not a
                facility — a home. A place where every resident is treated with
                the same dignity, warmth, and love they would give their own
                parents. Where meals are cooked with care, where names are known,
                and where no one is ever just a number.
              </p>
              <p className="font-serif text-xl font-semibold text-text-heading">
                &ldquo;We didn&apos;t build a facility. We opened our
                home.&rdquo;
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollSection>
            <h2 className="text-center font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-text-body">
              A dedicated team of caregivers who treat every resident like
              family.
            </p>
          </ScrollSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <ScrollSection key={member.name} delay={i * 0.1}>
                <TeamCard {...member} />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollSection>
            <h2 className="text-center font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Values
            </h2>
          </ScrollSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <ScrollSection key={value.title} delay={i * 0.1}>
                <ValueCard {...value} />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <ScrollSection key={badge.label}>
                <div className="text-center">
                  {badge.value && (
                    <p className="font-serif text-3xl font-bold text-accent-green">
                      {badge.value}
                    </p>
                  )}
                  <p className="mt-1 text-sm font-medium text-text-body">
                    {badge.label}
                  </p>
                  <div className="mx-auto mt-2 h-0.5 w-8 bg-accent-gold/50" />
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <ScrollSection>
          <h2 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
            Come see the difference in person.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
          >
            Schedule a Tour
          </Link>
        </ScrollSection>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify About page**

Run `npm run dev`. Navigate to `http://localhost:3000/about`. Verify:
- Parallax hero with headline
- Split layout story section with scroll animations
- Team cards with hover lift
- Value cards grid with staggered entry
- Trust badges with gold underlines
- Bottom CTA

- [ ] **Step 5: Commit**

```bash
git add components/value-card.tsx components/team-card.tsx app/about/page.tsx
git commit -m "feat: build About Us page with story, team, values, and trust badges"
```

---

### Task 8: Services Page

**Files:**
- Create: `app/services/page.tsx`
- Create: `components/service-card.tsx`

- [ ] **Step 1: Create service-card component**

Create `components/service-card.tsx`:

```tsx
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-l-4 border-accent-green">
      {/* Background image */}
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build the Services page**

Create `app/services/page.tsx`:

```tsx
import Link from "next/link";
import { ParallaxImage } from "@/components/parallax-image";
import { ScrollSection } from "@/components/scroll-section";
import { ServiceCard } from "@/components/service-card";
import { SERVICES } from "@/lib/constants";

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh]">
        <ParallaxImage
          src="/images/bedrooms/bedroom-01.jpg"
          alt="Comfortable bedroom at Flower AFH"
          className="h-full"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6 text-center">
          <h1 className="max-w-3xl font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Comprehensive care, delivered with heart.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Every service tailored to your loved one&apos;s unique needs.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ScrollSection key={service.title} delay={i * 0.05}>
              <ServiceCard {...service} />
            </ScrollSection>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-bg-card py-24 text-center">
        <ScrollSection>
          <p className="mx-auto max-w-2xl font-serif text-2xl font-semibold text-text-heading sm:text-3xl">
            Every service designed around your loved one&apos;s unique needs.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
          >
            Talk to Our Care Team
          </Link>
        </ScrollSection>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify Services page**

Run `npm run dev`. Navigate to `http://localhost:3000/services`. Verify:
- Parallax hero
- 8 service cards in 2-column grid with photo backgrounds
- Green left border on each card
- Hover: overlay lightens, image scales
- Bottom CTA section

- [ ] **Step 4: Commit**

```bash
git add components/service-card.tsx app/services/page.tsx
git commit -m "feat: build Services page with 8 photo-backed service cards"
```

---

### Task 9: Gallery Page

**Files:**
- Create: `app/gallery/page.tsx`
- Create: `components/gallery-grid.tsx`
- Create: `components/lightbox.tsx`

- [ ] **Step 1: Create lightbox component**

Create `components/lightbox.tsx`:

```tsx
"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  open,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const image = images[currentIndex];

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute left-4 top-4 text-sm text-white/60">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create gallery-grid component**

Create `components/gallery-grid.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  GALLERY_IMAGES,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryImage,
} from "@/lib/constants";
import { Lightbox } from "./lightbox";

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="sticky top-[72px] z-30 bg-bg-primary/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-x-auto px-6 py-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "text-accent-green"
                  : "text-text-body hover:text-text-heading"
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <motion.div
                  layoutId="gallery-tab"
                  className="absolute inset-0 rounded-full border border-accent-green/30 bg-accent-green/5"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group mb-4 cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="p-4 text-sm font-medium text-white">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        images={filtered}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev === 0 ? filtered.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev === filtered.length - 1 ? 0 : prev + 1
          )
        }
      />
    </>
  );
}
```

- [ ] **Step 3: Build the Gallery page**

Create `app/gallery/page.tsx`:

```tsx
import { GalleryGrid } from "@/components/gallery-grid";
import { ScrollSection } from "@/components/scroll-section";

export default function GalleryPage() {
  return (
    <div className="pt-24">
      {/* Hero text */}
      <section className="pb-8 text-center">
        <ScrollSection>
          <h1 className="font-serif text-4xl font-bold text-text-heading sm:text-5xl">
            A home you&apos;ll feel before you see it.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-body">
            Every photo is a promise — warmth, cleanliness, and dignity in
            every corner.
          </p>
        </ScrollSection>
      </section>

      <GalleryGrid />
    </div>
  );
}
```

- [ ] **Step 4: Verify Gallery page**

Run `npm run dev`. Navigate to `http://localhost:3000/gallery`. Verify:
- Text hero with no full-bleed photo
- Filter tabs centered, sticky below navbar
- Masonry grid with staggered fade-in
- Hover shows warm overlay with image name
- Click opens lightbox with prev/next arrows
- Arrow keys and ESC work in lightbox
- Filtering animates cards in/out

- [ ] **Step 5: Commit**

```bash
git add components/lightbox.tsx components/gallery-grid.tsx app/gallery/page.tsx
git commit -m "feat: build Gallery page with masonry grid, category filters, and lightbox"
```

---

### Task 10: Contact Us Page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/contact-form.tsx`

- [ ] **Step 1: Create contact-form component**

Create `components/contact-form.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, RELATIONSHIP_OPTIONS } from "@/lib/constants";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", SITE.web3formsKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    }
    setSubmitting(false);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="mb-4 text-accent-green">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-text-heading">
            Thank you.
          </h3>
          <p className="mt-2 text-text-body">
            We&apos;ll be in touch within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-heading">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-heading">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-heading">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="relationship" className="mb-1 block text-sm font-medium text-text-heading">
              Relationship to Resident
            </label>
            <select
              id="relationship"
              name="relationship"
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            >
              <option value="">Select...</option>
              {RELATIONSHIP_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-heading">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="tour_date" className="mb-1 block text-sm font-medium text-text-heading">
              Preferred Tour Date
            </label>
            <input
              type="date"
              id="tour_date"
              name="tour_date"
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-accent-green to-accent-green-light py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)] disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Build the Contact Us page**

Create `app/contact/page.tsx`:

```tsx
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { ScrollSection } from "@/components/scroll-section";
import { SITE } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div>
      {/* Split layout */}
      <section className="min-h-screen lg:flex">
        {/* Left: Photo */}
        <div className="relative h-[40vh] lg:h-auto lg:w-[55%]">
          <Image
            src="/images/living/living-01.jpg"
            alt="Warm living room at Flower AFH"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right: Form */}
        <div className="flex items-center px-6 py-16 lg:w-[45%] lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-md">
            <ScrollSection>
              <h1 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
                Let&apos;s start the conversation.
              </h1>
              <p className="mt-3 text-text-body">
                Reach out today — we&apos;re here to answer every question and
                help your family find peace of mind.
              </p>
            </ScrollSection>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <ScrollSection>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Address
              </h3>
              <p className="mt-2 text-sm text-text-body">{SITE.address}</p>
            </ScrollSection>
            <ScrollSection delay={0.1}>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Phone
              </h3>
              <p className="mt-2 text-sm text-text-body">
                <a href={`tel:${SITE.phone1.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-green">
                  {SITE.phone1}
                </a>
              </p>
              <p className="mt-1 text-sm text-text-body">
                <a href={`tel:${SITE.phone2.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-green">
                  {SITE.phone2}
                </a>
              </p>
            </ScrollSection>
            <ScrollSection delay={0.2}>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Email
              </h3>
              <p className="mt-2 text-sm text-text-body">
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent-green">
                  {SITE.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-text-body">{SITE.hours}</p>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${SITE.mapQuery}&zoom=15`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Flower Adult Family Home location"
          className="grayscale-[30%] contrast-[1.1]"
        />
      </section>

      {/* Closing line */}
      <section className="bg-bg-card py-16 text-center">
        <ScrollSection>
          <p className="font-serif text-xl italic text-text-heading sm:text-2xl">
            Every call, every visit, every question — handled with care.
          </p>
        </ScrollSection>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify Contact page**

Run `npm run dev`. Navigate to `http://localhost:3000/contact`. Verify:
- Split layout: photo left, form right (desktop), stacked (mobile)
- All form fields render with warm styling
- Green focus rings on inputs
- Dropdown has all relationship options
- Submit sends to Web3Forms (check network tab)
- Success message appears after submission
- Contact details in 3-column grid
- Google Maps embed loads
- Closing italic line at bottom

- [ ] **Step 4: Commit**

```bash
git add components/contact-form.tsx app/contact/page.tsx
git commit -m "feat: build Contact Us page with Web3Forms, map embed, and split layout"
```

---

### Task 11: Final Polish & Build Verification

**Files:**
- Modify: `app/layout.tsx` (add favicon metadata if needed)

- [ ] **Step 1: Run production build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors. Check for any TypeScript or lint warnings and fix them.

- [ ] **Step 2: Test production locally**

Run:
```bash
npm start
```

Navigate through all 5 pages and verify:
- Home: all 5 scroll beats animate smoothly
- About: story, team, values, trust badges all render
- Services: 8 service cards with photos
- Gallery: filter tabs work, masonry layout correct, lightbox opens/closes
- Contact: form submits, map loads, contact details correct
- Navbar: glassmorphism appears on scroll, all links work
- Footer: all info correct, links work
- Mobile: hamburger menu works, layouts stack properly

- [ ] **Step 3: Commit final build**

```bash
git add -A
git commit -m "chore: verify production build passes with all 5 pages"
```

---

## Summary

| Task | What it builds | Key files |
|------|---------------|-----------|
| 1 | Project scaffolding, Tailwind config, constants, layout | `tailwind.config.ts`, `lib/constants.ts`, `app/layout.tsx` |
| 2 | Download & organize all ~30 photos | `public/images/**` |
| 3 | Sticky glassmorphism navbar + mobile menu | `components/navbar.tsx`, `components/mobile-menu.tsx` |
| 4 | Warm charcoal footer | `components/footer.tsx` |
| 5 | Reusable animation components | `components/scroll-section.tsx`, `parallax-image.tsx`, `image-crossfade.tsx` |
| 6 | Home page scrollytelling (5 beats) | `app/page.tsx` |
| 7 | About Us page | `app/about/page.tsx`, `components/value-card.tsx`, `components/team-card.tsx` |
| 8 | Services page | `app/services/page.tsx`, `components/service-card.tsx` |
| 9 | Gallery page with masonry + lightbox | `app/gallery/page.tsx`, `components/gallery-grid.tsx`, `components/lightbox.tsx` |
| 10 | Contact page with Web3Forms | `app/contact/page.tsx`, `components/contact-form.tsx` |
| 11 | Final polish & build verification | All files |
