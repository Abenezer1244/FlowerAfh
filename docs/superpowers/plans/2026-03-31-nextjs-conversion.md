# Flower AFH Next.js Conversion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert 5 standalone HTML pages for Flower Adult Family Home into a Next.js 14 App Router project with shared layout, real routing, real business info, GSAP animations, and Web3Forms integration.

**Architecture:** Next.js 14 App Router with TypeScript and Tailwind CSS. Each HTML page becomes a route. Shared components (Navbar, Footer, animation wrappers) extracted into `components/`. All content data centralized in `lib/constants.ts`. GSAP + ScrollTrigger via npm for animations. Iconify via CDN for icons.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, GSAP 3, Iconify CDN, Web3Forms

**Source HTML files** (in project root, read-only reference):
- `generated-page (1).html` — Contact
- `generated-page (2).html` — Home
- `generated-page (3).html` — About
- `generated-page (4).html` — Services
- `generated-page (5).html` — Gallery

---

## Task 1: Scaffold Next.js Project and Configure Tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

Run from project root (where the HTML files are):

```bash
npx create-next-app@14 temp-next --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Then move contents out of `temp-next/` into project root:

```bash
cp -r temp-next/* temp-next/.* . 2>/dev/null; rm -rf temp-next
```

- [ ] **Step 2: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 3: Configure `tailwind.config.ts` with custom colors**

Replace the generated `tailwind.config.ts` with:

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
        "brand-bg": "#ece9e4",
        "brand-dark": "#3b3631",
        "brand-darker": "#322d28",
        "brand-accent": "#8c7b66",
        "brand-muted": "#6b645c",
        "brand-muted-dark": "#a69c91",
        "brand-border": "#cdc9c1",
        "brand-border-dark": "#4a453f",
        "brand-subtle": "#dfdcd5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Google Sans Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Configure `next.config.mjs`**

Replace with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "Inter", sans-serif;
}

.font-display {
  font-family: "Google Sans Flex", sans-serif !important;
}

/* Hide default details marker */
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
```

- [ ] **Step 6: Write minimal `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flower Adult Family Home LLC",
  description:
    "A licensed Adult Family Home serving Everett, Washington — compassionate care, warm spaces, and dignity in every detail.",
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
      </head>
      <body className="bg-brand-bg text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-bg">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Write placeholder `app/page.tsx`**

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Flower Adult Family Home</h1>
    </main>
  );
}
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`, page renders "Flower Adult Family Home" with warm background color.

- [ ] **Step 9: Update `.gitignore`**

Ensure `.gitignore` includes:

```
node_modules/
.next/
.superpowers/
```

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs app/globals.css app/layout.tsx app/page.tsx .gitignore .eslintrc.json
git commit -m "feat: scaffold Next.js 14 project with Tailwind and GSAP"
```

---

## Task 2: Create Constants File with All Business Data

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Write `lib/constants.ts`**

This centralizes all content. Read from the HTML source files to extract exact text.

```ts
export const SITE = {
  name: "Flower Adult Family Home LLC",
  tagline: "Where Every Day Feels Like Home",
  description:
    "A licensed Adult Family Home serving Everett, Washington — compassionate care, warm spaces, and dignity in every detail.",
  address: "605 74th St SW, Everett, WA 98203",
  addressLine1: "605 74TH ST SW",
  addressLine2: "EVERETT, WASHINGTON 98203",
  phone1: "(206) 504-0037",
  phone2: "(206) 313-1516",
  email: "abeba@flowerafh.com",
  hours: "Available 24/7 for inquiries",
  web3formsKey: "cd9bdd93-9d53-4559-9d71-340c10af26dc",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.0!2d-122.2418!3d47.8901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s605+74th+St+SW+Everett+WA+98203!5e0!3m2!1sen!2sus",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  {
    value: "1:3",
    unit: "Ratio",
    icon: "solar:users-group-two-rounded-linear",
    description:
      "Our exceptional staff-to-resident ratio ensures prompt and personalized assistance.",
  },
  {
    value: "24",
    unit: "Hrs",
    icon: "solar:clock-circle-linear",
    description:
      "Round-the-clock awake staff availability for health monitoring and emergency response.",
  },
  {
    value: "100",
    unit: "%",
    icon: "solar:shield-star-linear",
    description:
      "Commitment to family peace of mind through transparent communication and excellent care.",
  },
];

export const EXPERTISE = [
  {
    title: "Assisted Living",
    labelLeft: "DAILY SUPPORT",
    labelRight: "24/7",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    alt: "Assisted Living Room",
  },
  {
    title: "Memory Care",
    labelLeft: "SPECIALIZED",
    labelRight: "SECURE",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    alt: "Medical Support",
  },
  {
    title: "Respite Care",
    labelLeft: "SHORT-TERM",
    labelRight: "RECOVERY",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    alt: "Bright Relaxing Area",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Finding Flower Adult Family Home was a blessing. The staff treats my mother with such dignity and warmth, it truly feels like an extension of our own family rather than a facility.",
    name: "Marcus V.",
    role: "Son of Resident",
    initial: "M",
  },
  {
    quote:
      "The level of communication and medical attention provided is exceptional. Knowing my father is safe, eating well, and socializing has given us profound peace of mind.",
    name: "Elena R.",
    role: "Daughter of Resident",
    initial: "E",
  },
  {
    quote:
      "From medication management to the beautiful, clean home environment, their commitment is absolute. We couldn't have asked for a better place for our aunt's recovery.",
    name: "Sarah J.",
    role: "Niece of Resident",
    initial: "S",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What level of care do you provide?",
    answer:
      "We provide comprehensive 24/7 care tailored to each resident. This includes assistance with Activities of Daily Living (ADLs) such as bathing, dressing, and grooming, as well as specialized care for varying cognitive and physical needs.",
  },
  {
    question: "Are meals and dietary accommodations included?",
    answer:
      "Yes, we serve three nutritious, home-cooked meals daily, along with healthy snacks. We happily accommodate special dietary restrictions, including diabetic, low-sodium, and puree diets, ensuring meals are both safe and enjoyable.",
  },
  {
    question: "Can families visit at any time?",
    answer:
      "Absolutely. We believe family involvement is crucial for the wellbeing of our residents. We have generous visiting hours and encourage family members to participate in activities, share meals, or simply spend quality time in our comfortable common areas.",
  },
  {
    question: "Do you handle medication management?",
    answer:
      "Yes, our trained and certified staff handles all medication administration. We strictly follow physician orders, securely store medications, and maintain detailed logs to ensure the right dosage is given at the right time.",
  },
  {
    question: "How do you ensure the safety of residents?",
    answer:
      "Safety is our top priority. Our home is equipped with safety features such as grab bars, accessible showers, and emergency call systems. Staff is awake and present 24/7 to monitor residents and prevent wandering or falls.",
  },
];

export const CARE_APPROACH_STEPS = [
  {
    number: "01",
    title: "Comprehensive Assessment",
    description:
      "Before a resident joins our home, we conduct an in-depth consultation with the family and primary care physicians. We evaluate medical history, mobility, dietary preferences, and personal routines to establish a baseline of holistic needs.",
  },
  {
    number: "02",
    title: "Customized Care Planning",
    description:
      "Using the assessment data, our nursing directors craft a highly specific care blueprint. This plan dictates daily medication schedules, physical therapy integration, specific dietary requirements, and cognitive engagement activities.",
  },
  {
    number: "03",
    title: "Seamless Integration",
    description:
      "Transitioning to a new home can be overwhelming. We manage this phase delicately, ensuring the resident's suite is prepared with their personal belongings, and our staff focuses on building immediate trust and rapport.",
  },
  {
    number: "04",
    title: "Continuous Review",
    description:
      "Health and happiness are dynamic. We hold monthly reviews of each resident's care plan, adjusting medication, diet, and support levels proactively. Families are kept intimately informed every step of the way.",
  },
];

export const CORE_SERVICES = [
  {
    title: "24/7 Personal Assistance",
    description:
      "Round-the-clock caregivers available at a moment's notice to assist with any immediate needs, ensuring total safety and peace of mind at all hours.",
    icon: "solar:user-hands-linear",
  },
  {
    title: "Medication Management",
    description:
      "Strict adherence to prescribed medication schedules, coordinated directly with pharmacies and overseen by registered nursing staff to prevent any errors.",
    icon: "solar:pills-linear",
  },
  {
    title: "Nutritious Dining",
    description:
      "Three chef-curated meals a day, plus snacks. All menus are tailored to accommodate specific dietary restrictions, allergies, and nutritional requirements.",
    icon: "solar:chef-hat-linear",
  },
  {
    title: "Mobility & Transfers",
    description:
      "Expert assistance with walking, wheelchair navigation, and safe transferring from bed to chair, reducing the risk of falls and promoting physical independence.",
    icon: "solar:wheelchair-linear",
  },
  {
    title: "Hygiene & Grooming",
    description:
      "Dignified support with bathing, dressing, dental care, and personal grooming to ensure residents feel clean, comfortable, and confident every day.",
    icon: "solar:bath-linear",
  },
  {
    title: "Housekeeping",
    description:
      "Comprehensive daily cleaning, trash removal, and regular personal laundry and linen services to maintain a pristine and hygienic living environment.",
    icon: "solar:washing-machine-linear",
  },
];

export const SPECIALTIES = [
  {
    title: "Memory Care",
    description:
      "Specialized, compassionate support for individuals living with Alzheimer's and other forms of dementia. We employ validation therapy, structured routines, and secure environments to reduce anxiety and foster moments of clarity and joy.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
    alt: "Memory Care",
    features: [
      "Secure perimeter systems",
      "Cognitive stimulation activities",
      "Specialized staff training",
    ],
  },
  {
    title: "Respite & Recovery",
    description:
      "Short-term stays designed for recovery after surgery, illness, or hospital discharge. We provide the intensive support needed to safely transition back to independent living, while offering family caregivers a well-deserved break.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    alt: "Post-Surgical Respite",
    features: [
      "Physical therapy coordination",
      "Wound care management",
      "Flexible stay durations",
    ],
  },
  {
    title: "Palliative & Hospice",
    description:
      "End-of-life care focused on profound comfort, dignity, and pain management. We partner closely with visiting hospice agencies to ensure your loved one remains completely at peace in a familiar, home-like environment.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    alt: "Hospice Care",
    features: [
      "24/7 symptom monitoring",
      "Emotional support for families",
      "Unrestricted family visiting",
    ],
  },
];

export const AMENITIES = [
  {
    title: "Private Furnished Suites",
    description:
      "Spacious, naturally lit rooms with premium beds, personal climate control, and space for cherished belongings.",
    icon: "solar:bed-linear",
  },
  {
    title: "Accessible En-suites",
    description:
      "Zero-entry showers, grab bars, emergency pull cords, and anti-slip flooring designed specifically for senior safety.",
    icon: "solar:bath-linear",
  },
  {
    title: "Landscaped Gardens",
    description:
      "Secure, beautifully maintained outdoor spaces with walking paths, shaded seating, and raised planter beds.",
    icon: "solar:tree-linear",
  },
  {
    title: "Advanced Security",
    description:
      "24-hour monitoring, alarmed exterior doors, fire suppression systems, and personal emergency pendants.",
    icon: "solar:shield-check-linear",
  },
  {
    title: "Entertainment & Wi-Fi",
    description:
      "High-speed internet throughout the home, cable television in every room, and a stocked library and lounge area.",
    icon: "solar:tv-linear",
  },
];

export const ABOUT_TEAM = [
  {
    name: "Sarah Jenkins",
    role: "Founder & Administrator",
    bio: "With over 15 years in geriatric care, Sarah envisioned a space where medical excellence meets true, familial compassion. She oversees the entire operation with an unwavering standard of quality.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Michael Chen",
    role: "Resident Health Director",
    bio: "Overseeing our clinical standards, Michael ensures that every resident's medical needs are meticulously managed, coordinating seamlessly with primary care physicians and specialists.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Head Caregiver",
    bio: "Elena brings unmatched warmth and dedication to the home. She forms deep, enduring bonds with residents and handles the complexities of daily operations with complete grace.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
];

export const ABOUT_MILESTONES = [
  {
    year: "2018",
    label: "The Inception",
    title: "Recognizing the Need",
    description:
      "After witnessing the impersonal nature of large-scale facilities, our founders realized the pressing need for a more intimate care model. The blueprint for Flower Adult Family Home was drafted, focusing intensely on low resident-to-staff ratios and the preservation of homelike comfort.",
  },
  {
    year: "2020",
    label: "Opening Doors",
    title: "A Home Realized",
    description:
      "We officially opened our doors, welcoming our first residents into a fully renovated, highly accessible, and beautifully designed residential space. Our core team of certified caregivers was established, setting the unbreakable foundation for our daily care philosophy.",
  },
  {
    year: "2023",
    label: "Expansion of Care",
    title: "Specialized Services",
    description:
      "To better serve our growing community, we expanded our expertise to include dedicated memory care programs and short-term respite stays. We integrated advanced health monitoring technology while fiercely preserving the warmth of our traditional home environment.",
  },
];

export const GALLERY_IMAGES = [
  { src: "https://i.ibb.co/s969MGyd/1c3c84141a33e0cced2283b645658d87-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 1" },
  { src: "https://i.ibb.co/cKMgrBgP/3ef7a64d0ed08504da4b3024d11ed8c0-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 2" },
  { src: "https://i.ibb.co/DDPqq0SP/7afa51fe0c3e318f09fe6b0cb799ca04-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 3" },
  { src: "https://i.ibb.co/prndgr1y/7c6e8e85eebffa55d2bdcdbae9877f05-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 4" },
  { src: "https://i.ibb.co/JwyWYTrd/7eba510eb53b95c3539a3274b10a1e87-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 5" },
  { src: "https://i.ibb.co/VcB2C1j6/9c4c1db4ce6c4159633f27fd9259a39e-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 6" },
  { src: "https://i.ibb.co/7xwZXtZ7/9ee9b50d5a03c530707b40ae10e1e5fd-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 7" },
  { src: "https://i.ibb.co/j95N77wd/25ff525ad894d80b71ac19f0f87ebf1a-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 8" },
  { src: "https://i.ibb.co/5XXcZ9GQ/36d354edd8bc5454dec3c721f38065be-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 9" },
  { src: "https://i.ibb.co/nMX1kJnX/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0019-2-740x493.jpg", alt: "Senior Care 10" },
  { src: "https://i.ibb.co/0RYPdtLb/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0022-2.jpg", alt: "Senior Care 11" },
  { src: "https://i.ibb.co/C5MCKdKZ/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bedroom-IMGL0025-2-2000x1333.jpg", alt: "Senior Care 12" },
  { src: "https://i.ibb.co/F4qtN9vR/180-2nd-Ave-S-Edmonds-WA-98020-USA-Dining-room-IMGL0019-2000x1333.jpg", alt: "Senior Care 13" },
  { src: "https://i.ibb.co/6JVy48L6/0664c71c16af7db24b96ead62f983742-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 14" },
  { src: "https://i.ibb.co/rKSNFgxs/9980a06e3da7384cfb7990154b6e0fff-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 15" },
  { src: "https://i.ibb.co/R4zqt1Qv/35148c286add27d447b3f47de8d63e36-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 16" },
  { src: "https://i.ibb.co/7N6MRysd/229071-tiny.jpg", alt: "Senior Care 17" },
  { src: "https://i.ibb.co/FqkykfVp/a75018ea2db14ad6a04df57fc1851daa-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 18" },
  { src: "https://i.ibb.co/kVWkpWMy/bb05900f6d09d9a45e229bb4b123d884-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 19" },
  { src: "https://i.ibb.co/gM9X7wp4/Blog-Company-News.png", alt: "Senior Care 20" },
  { src: "https://i.ibb.co/4ZWVCtKm/c0ac88a48a0d4319319a25fc8be9071d-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 21" },
  { src: "https://i.ibb.co/8D5hV51C/c009d933140daa0498fb9471134fe02a-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 22" },
  { src: "https://i.ibb.co/N2tWbqTf/cb81fd5c76159a7fc851ff00d4cb799f-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 23" },
  { src: "https://i.ibb.co/VcqdHKDB/dea4a7f20233bfa440ac8ed343980426-uncropped-scaled-within-1344-1008.webp", alt: "Senior Care 24" },
  { src: "https://i.ibb.co/4wq736YX/engaging-games-for-seniors-1080x675.jpg", alt: "Senior Care 25" },
  { src: "https://i.ibb.co/hRFN7nY1/gettyimages-1633393933-640x640.jpg", alt: "Senior Care 26" },
  { src: "https://i.ibb.co/fd8tXxvH/istockphoto-638886566-612x612.jpg", alt: "Senior Care 27" },
  { src: "https://i.ibb.co/XZtxZGTj/istockphoto-2163703602-612x612.jpg", alt: "Senior Care 28" },
];

export const CARE_TYPE_OPTIONS = [
  { value: "", label: "Select an option...", disabled: true },
  { value: "assisted", label: "Assisted Living" },
  { value: "memory", label: "Memory Care" },
  { value: "respite", label: "Respite / Short-term Stay" },
  { value: "other", label: "Other Inquiry" },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add centralized constants with business data and content"
```

---

## Task 3: Build Shared Navbar and Mobile Menu

**Files:**
- Create: `components/navbar.tsx`, `components/mobile-menu.tsx`

- [ ] **Step 1: Write `components/mobile-menu.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `components/navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-brand-border lg:px-12">
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "font-medium text-brand-accent"
                  : "font-normal hover:text-brand-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-sm font-medium tracking-wider uppercase"
        >
          MENU
        </button>

        <Link
          href="/contact"
          className="hidden sm:flex items-center gap-1 text-sm font-medium border-b border-brand-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all"
        >
          SCHEDULE A TOUR{" "}
          {/* @ts-expect-error — Iconify web component */}
          <iconify-icon
            icon="solar:arrow-right-up-linear"
            width="16"
            height="16"
            style={{ strokeWidth: "1.5px" }}
          />
        </Link>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx components/mobile-menu.tsx
git commit -m "feat: add shared navbar with mobile menu"
```

---

## Task 4: Build Shared Footer

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Write `components/footer.tsx`**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-brand-darker text-brand-bg pt-24 pb-12 overflow-hidden z-10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-wider text-brand-muted-dark uppercase mb-16 border-b border-brand-border-dark pb-6 gap-6">
          <span>ESTABLISHED CARE</span>
          <span className="hidden md:inline">
            Compassion // Dignity // Respect
          </span>
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
              <a href="#" className="hover:text-brand-bg transition-colors">
                FACEBOOK
              </a>
              <a href="#" className="hover:text-brand-bg transition-colors">
                DIRECTORIES
              </a>
            </div>
            <a href="#" className="hover:text-brand-bg transition-colors">
              TERMS &amp; PRIVACY
            </a>
          </div>
        </div>
      </div>

      {/* Massive Footer Graphic Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-[0.03] transform translate-y-1/4">
        <h1
          className="text-center tracking-tighter text-brand-bg select-none font-display font-normal"
          style={{ fontSize: "20vw" }}
        >
          FLOWER
        </h1>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add shared footer with real business info"
```

---

## Task 5: Build GSAP Animation Components

**Files:**
- Create: `components/gsap-fade-up.tsx`, `components/image-anim.tsx`

- [ ] **Step 1: Write `components/gsap-fade-up.tsx`**

```tsx
"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapFadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GsapFadeUp({ children, className = "", delay = 0 }: GsapFadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `components/image-anim.tsx`**

```tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageAnimProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageAnim({ src, alt, className = "" }: ImageAnimProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cols = 4;

    const ctx = gsap.context(() => {
      for (let i = 0; i < cols; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "absolute inset-0 overflow-hidden rounded-sm";

        const left = (i / cols) * 100;
        const right = 100 - ((i + 1) / cols) * 100;
        wrapper.style.clipPath = `inset(0 ${right}% 0 ${left}%)`;
        wrapper.style.webkitClipPath = `inset(0 ${right}% 0 ${left}%)`;

        const innerImg = document.createElement("img");
        innerImg.src = src;
        innerImg.alt = alt;
        innerImg.className = "absolute w-full object-cover";
        innerImg.style.height = "140%";
        innerImg.style.top = "-20%";
        innerImg.style.left = "0";

        wrapper.appendChild(innerImg);
        container.appendChild(wrapper);

        gsap.fromTo(
          innerImg,
          { yPercent: i % 2 === 0 ? -15 : -5 },
          {
            yPercent: i % 2 === 0 ? 15 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          innerImg,
          { filter: "blur(12px) brightness(0.9)" },
          {
            filter: "blur(0px) brightness(1)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      // Clean up dynamically created elements
      const dynamicEls = container.querySelectorAll("div.absolute");
      dynamicEls.forEach((el) => el.remove());
    };
  }, [src, alt]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm bg-brand-subtle ${className}`}>
      {/* Hidden original image for SSR / no-JS fallback */}
      <img src={src} alt={alt} className="w-full h-full object-cover opacity-0" />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/gsap-fade-up.tsx components/image-anim.tsx
git commit -m "feat: add GSAP fade-up and column-slice image animation components"
```

---

## Task 6: Build Contact Form Component (Web3Forms)

**Files:**
- Create: `components/contact-form.tsx`

- [ ] **Step 1: Write `components/contact-form.tsx`**

```tsx
"use client";

import { useState, FormEvent } from "react";
import { SITE, CARE_TYPE_OPTIONS } from "@/lib/constants";

interface ContactFormProps {
  /** "contact" for the Contact page form, "cta" for the Home/About CTA form */
  variant: "contact" | "cta";
}

export default function ContactForm({ variant }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", SITE.web3formsKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-16 ${variant === "cta" ? "text-brand-bg" : "text-brand-dark"}`}>
        {/* @ts-expect-error — Iconify web component */}
        <iconify-icon icon="solar:check-circle-linear" width="48" height="48" class="text-brand-accent" />
        <h3 className="text-2xl font-display tracking-tight">Message Sent!</h3>
        <p className={`text-sm ${variant === "cta" ? "text-brand-muted-dark" : "text-brand-muted"}`}>
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-medium tracking-wider uppercase text-brand-accent border-b border-brand-accent pb-0.5"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark"
              placeholder="Jane"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark"
            placeholder="jane@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark"
            placeholder="(555) 000-0000"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            How can we help?
          </label>
          <textarea
            rows={4}
            name="message"
            required
            className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark resize-none"
            placeholder="Tell us a little about your needs..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 bg-brand-dark text-brand-bg px-8 py-4 text-sm font-medium hover:bg-brand-accent transition-colors w-fit flex items-center gap-3 disabled:opacity-50"
        >
          {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}{" "}
          {/* @ts-expect-error — Iconify web component */}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" style={{ strokeWidth: "1.5px" }} />
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    );
  }

  // CTA variant (Home/About pages)
  return (
    <div className="bg-brand-darker rounded-2xl p-8 md:p-10 border border-brand-border-dark">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">
            Type of Care Needed
          </label>
          <select
            name="care_type"
            defaultValue=""
            className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer rounded-none"
          >
            {CARE_TYPE_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-brand-darker"
              >
                {opt.label}
              </option>
            ))}
          </select>
          {/* @ts-expect-error — Iconify web component */}
          <iconify-icon
            icon="solar:alt-arrow-down-linear"
            width="16"
            height="16"
            class="absolute right-0 bottom-3 text-brand-muted-dark pointer-events-none"
            style={{ strokeWidth: "1.5px" }}
          />
        </div>
        <div className="flex flex-col gap-2 relative mb-2">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">
            Message or Questions
          </label>
          <textarea
            rows={3}
            name="message"
            className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 border border-[#544e47] rounded-sm checked:bg-brand-accent checked:border-brand-accent cursor-pointer transition-colors bg-transparent accent-brand-accent"
          />
          <label htmlFor="terms" className="text-xs text-brand-muted-dark cursor-pointer">
            I agree to the Terms &amp; Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-brand-bg hover:bg-brand-accent hover:text-brand-bg text-brand-dark text-xs font-medium tracking-wider uppercase py-4 rounded transition-colors w-full flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {status === "submitting" ? "SUBMITTING..." : "SUBMIT INQUIRY"}{" "}
          {/* @ts-expect-error — Iconify web component */}
          <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14" style={{ strokeWidth: "1.5px" }} />
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/contact-form.tsx
git commit -m "feat: add Web3Forms contact form component with contact and CTA variants"
```

---

## Task 7: Integrate Shared Components into Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx` to include Navbar and Footer**

Replace the full file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Flower Adult Family Home LLC",
  description:
    "A licensed Adult Family Home serving Everett, Washington — compassionate care, warm spaces, and dignity in every detail.",
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
      </head>
      <body className="bg-brand-bg text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server renders Navbar and Footer**

```bash
npm run dev
```

Expected: Page shows navbar with 5 links, placeholder content, and dark footer with real address.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: integrate navbar and footer into root layout"
```

---

## Task 8: Build Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `app/page.tsx`**

This is the largest page. Convert `generated-page (2).html` faithfully. The page is a client component because it uses GSAP hero animations directly.

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapFadeUp from "@/components/gsap-fade-up";
import ImageAnim from "@/components/image-anim";
import ContactForm from "@/components/contact-form";
import { SITE, STATS, EXPERTISE, TESTIMONIALS, FAQ_ITEMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-fade-up-home",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden z-10">
        <h1
          className="gsap-fade-up-home absolute top-0 w-full text-center tracking-tighter text-brand-dark select-none z-0 mt-8 opacity-10 font-display font-normal"
          style={{ fontSize: "16vw", lineHeight: "0.8" }}
        >
          FLOWER
        </h1>

        <div className="relative z-10 mx-auto w-11/12 max-w-7xl mt-24 lg:mt-32 shadow-2xl h-[60vh]">
          <ImageAnim
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
            alt="Warm Modern Living Space"
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
          <GsapFadeUp>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight max-w-4xl font-display font-normal">
              Providing compassionate care in a place you can{" "}
              <span className="text-brand-accent font-display font-normal">
                truly call home.
              </span>
            </h2>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-24 items-start">
            <GsapFadeUp className="md:col-span-3">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-brand-border px-3 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 bg-brand-dark rounded-full" /> Our
                Mission
              </span>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-6 flex flex-col gap-6">
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                Flower Adult Family Home LLC offers a dignified, residential
                alternative to institutional care. With profound dedication and
                personalized attention, we support our residents through daily
                living while ensuring absolute comfort, safety, and peace of
                mind.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium border-b border-brand-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all"
                >
                  SPEAK WITH OUR CARE TEAM{" "}
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16" style={{ strokeWidth: "1.5px" }} />
                </Link>
              </div>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-3 text-right">
              <p className="text-7xl tracking-tight font-display font-normal text-brand-accent">
                24/7
              </p>
              <p className="text-sm font-medium tracking-wider text-brand-muted uppercase mt-2">
                Dedicated Care
              </p>
            </GsapFadeUp>
          </div>

          <GsapFadeUp className="flex flex-wrap items-center justify-between gap-8 mt-32 text-xs font-medium tracking-wider text-brand-accent uppercase">
            <p>BEYOND STANDARD ASSISTANCE.</p>
            <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=320&q=80" alt="Comfortable Detail" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=320&q=80" alt="Home Environment" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" alt="Peaceful Space" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
            </div>
            <p>WE FOSTER WELLBEING.</p>
          </GsapFadeUp>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-brand-dark text-brand-bg pt-24 pb-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-6">
            <h2 className="text-4xl md:text-5xl tracking-tight uppercase max-w-2xl leading-tight font-display font-normal">
              A sanctuary of comfort and professional care
            </h2>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-brand-muted px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-bg rounded-full" /> Why Choose Us
            </span>
          </GsapFadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="flex flex-col gap-12">
              <GsapFadeUp>
                <h3 className="text-3xl tracking-tight text-brand-muted-dark max-w-md leading-snug font-display font-normal">
                  Transforming daily challenges{" "}
                  <span className="text-brand-bg font-display font-normal">
                    into moments of ease
                  </span>{" "}
                  with flawless execution.
                </h3>
              </GsapFadeUp>

              <GsapFadeUp className="flex items-center gap-8 mt-4">
                <div className="bg-brand-darker border border-brand-border-dark rounded-lg p-5 flex flex-col gap-3 min-w-[140px]">
                  <span className="text-xs text-brand-muted-dark font-normal uppercase tracking-wider">
                    State Licensed
                  </span>
                  <div className="flex items-center gap-2 font-medium text-lg tracking-tight text-brand-accent">
                    {/* @ts-expect-error — Iconify web component */}
                    <iconify-icon icon="solar:shield-check-linear" width="24" height="24" style={{ strokeWidth: "1.5px" }} />
                    CERTIFIED
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-display font-normal tracking-tight text-brand-bg mb-2">
                    Personalized Attention
                  </h4>
                  <p className="text-sm text-brand-muted-dark leading-relaxed mb-4 max-w-sm">
                    We maintain an exceptionally low resident-to-staff ratio,
                    ensuring that your loved one receives the immediate,
                    individualized support they deserve in a truly homelike
                    atmosphere.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent border-b border-brand-accent/50 pb-0.5 hover:border-brand-accent transition-all uppercase tracking-wider"
                  >
                    Explore Services{" "}
                    {/* @ts-expect-error — Iconify web component */}
                    <iconify-icon icon="solar:arrow-right-up-linear" width="12" height="12" style={{ strokeWidth: "1.5px" }} />
                  </Link>
                </div>
              </GsapFadeUp>
            </div>

            <GsapFadeUp className="relative w-full aspect-square max-w-md ml-auto flex items-center justify-center opacity-70">
              <div className="grid grid-cols-12 gap-2 w-full h-full rotate-12 scale-110">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="col-span-12 h-1 border-b border-dashed border-[#544e47]" />
                ))}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-transparent to-transparent" />
                {/* @ts-expect-error — Iconify web component */}
                <iconify-icon icon="solar:heart-pulse-linear" width="96" height="96" class="-translate-x-1/2 -translate-y-1/2 text-[#544e47] absolute top-1/2 left-1/2" style={{ strokeWidth: "1px" }} />
              </div>
            </GsapFadeUp>
          </div>

          {/* Stats Grid */}
          <GsapFadeUp className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.value} className="border border-brand-border-dark rounded-xl p-8 bg-brand-darker/50 hover:bg-brand-darker transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <p className="text-5xl tracking-tight group-hover:text-brand-accent transition-colors font-display font-normal">
                    {stat.value}
                    <span className="text-2xl text-brand-muted-dark font-display font-normal ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon={stat.icon} width="24" height="24" class="text-brand-muted-dark group-hover:text-brand-accent transition-colors" style={{ strokeWidth: "1.5px" }} />
                </div>
                <p className="text-sm text-brand-muted-dark">{stat.description}</p>
              </div>
            ))}
          </GsapFadeUp>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative bg-brand-dark text-brand-bg pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <GsapFadeUp className="flex flex-col gap-6">
              <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase">
                [ OUR EXPERTISE ]
              </span>
              <ImageAnim
                src={EXPERTISE[0].image}
                alt={EXPERTISE[0].alt}
                className="w-64 h-64"
              />
              <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                <span>{EXPERTISE[0].labelLeft}</span>
                <span>{EXPERTISE[0].labelRight}</span>
              </div>
              <p className="text-base font-normal">{EXPERTISE[0].title}</p>
            </GsapFadeUp>

            <div className="flex flex-col items-end text-right max-w-xl">
              <GsapFadeUp>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-tight font-display font-normal">
                  TAILORED CARE PLANS
                </h2>
              </GsapFadeUp>
              <GsapFadeUp>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  We curate specialized care environments that align with
                  specific health requirements. From daily living assistance to
                  advanced memory support, our home adapts to your needs.
                </p>
              </GsapFadeUp>
              <GsapFadeUp className="flex flex-col gap-6 text-left w-64 mr-32">
                <ImageAnim
                  src={EXPERTISE[1].image}
                  alt={EXPERTISE[1].alt}
                  className="w-full h-64"
                />
                <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                  <span>{EXPERTISE[1].labelLeft}</span>
                  <span>{EXPERTISE[1].labelRight}</span>
                </div>
                <p className="text-base font-normal">{EXPERTISE[1].title}</p>
              </GsapFadeUp>
            </div>
          </div>

          {/* Third expertise row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <GsapFadeUp className="md:col-span-4 flex flex-col gap-4">
              <p className="text-6xl text-brand-accent tracking-tight font-display font-normal">
                3
              </p>
              <p className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase leading-relaxed max-w-[150px]">
                CORE PILLARS OF OUR FACILITY
              </p>
            </GsapFadeUp>

            <GsapFadeUp className="md:col-span-4 flex flex-col justify-end h-full pb-8">
              <h2 className="text-3xl tracking-tight uppercase leading-snug font-display font-normal">
                EMBODYING
                <br />
                TRUE COMPASSION
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-medium border-b border-brand-muted-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all uppercase tracking-wider mt-6 w-fit text-brand-muted-dark"
              >
                DISCUSS YOUR NEEDS{" "}
                {/* @ts-expect-error — Iconify web component */}
                <iconify-icon icon="solar:arrow-right-up-linear" width="12" height="12" style={{ strokeWidth: "1.5px" }} />
              </Link>
            </GsapFadeUp>

            <GsapFadeUp className="md:col-span-4 flex flex-col gap-6">
              <ImageAnim
                src={EXPERTISE[2].image}
                alt={EXPERTISE[2].alt}
                className="w-full aspect-[4/3]"
              />
              <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                <span>{EXPERTISE[2].labelLeft}</span>
                <span>{EXPERTISE[2].labelRight}</span>
              </div>
              <p className="text-base font-normal">{EXPERTISE[2].title}</p>
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-brand-bg text-brand-dark py-32 z-10 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal max-w-xl">
              Words from our families
            </h2>
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase">
              [ CLIENT PERSPECTIVES ]
            </span>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <GsapFadeUp key={t.name} className="border border-brand-border rounded-xl p-8 bg-brand-subtle/30 flex flex-col justify-between group hover:border-brand-accent transition-colors duration-300">
                <div>
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon="solar:quote-right-linear" width="32" height="32" class="text-brand-accent mb-8 opacity-40 group-hover:opacity-100 transition-opacity" style={{ strokeWidth: "1.5px" }} />
                  <p className="text-sm text-brand-muted leading-relaxed mb-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-border flex items-center justify-center text-brand-dark font-display">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-brand-accent mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col items-center text-center mb-16 gap-4">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase">
              [ INQUIRIES ]
            </span>
            <h2 className="text-3xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal">
              Frequently Asked Questions
            </h2>
          </GsapFadeUp>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((faq) => (
              <GsapFadeUp key={faq.question}>
                <details className="group bg-brand-bg rounded-lg border border-brand-border overflow-hidden transition-all duration-300 hover:border-brand-accent">
                  <summary className="flex justify-between items-center p-6 cursor-pointer text-lg tracking-tight font-display select-none">
                    {faq.question}
                    <span className="transition-transform duration-300 group-open:rotate-180 text-brand-accent flex items-center justify-center">
                      {/* @ts-expect-error — Iconify web component */}
                      <iconify-icon icon="solar:alt-arrow-down-linear" width="20" height="20" style={{ strokeWidth: "1.5px" }} />
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-sm text-brand-muted leading-relaxed border-t border-brand-border/50 mt-2">
                    {faq.answer}
                  </div>
                </details>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 border-t border-brand-border-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <GsapFadeUp className="flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-6">
                  [ INITIATE DIALOGUE ]
                </span>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal mb-8 max-w-md">
                  Schedule a tour today.
                </h2>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  Connect with our care coordinators to explore how Flower Adult
                  Family Home can provide the perfect environment for your loved
                  one. We are ready to answer your questions and guide you
                  through the process.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-12 border-t border-brand-border-dark pt-10 mt-8 lg:mt-auto">
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    General Inquiries
                  </span>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    Direct Line
                  </span>
                  <a href={`tel:${SITE.phone2}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.phone2}
                  </a>
                </div>
              </div>
            </GsapFadeUp>

            <GsapFadeUp>
              <ContactForm variant="cta" />
            </GsapFadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify Home page renders**

```bash
npm run dev
```

Visit `http://localhost:3000`. Expected: Full home page with hero, all sections, animations, FAQ accordion, CTA form.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build Home page with all sections from HTML source"
```

---

## Task 9: Build About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write `app/about/page.tsx`**

Convert `generated-page (3).html` faithfully.

```tsx
"use client";

import GsapFadeUp from "@/components/gsap-fade-up";
import ImageAnim from "@/components/image-anim";
import ContactForm from "@/components/contact-form";
import { SITE, ABOUT_TEAM, ABOUT_MILESTONES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            <GsapFadeUp className="lg:col-span-7 z-10">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
                [ ABOUT US ]
              </span>
              <h1 className="text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
                Redefining care <br />
                <span className="text-brand-accent">with heart and home.</span>
              </h1>
              <p className="text-base md:text-lg text-brand-muted leading-relaxed max-w-xl">
                Flower Adult Family Home was founded on a simple premise: care
                should feel like family. We&apos;ve built an environment where
                dignity, profound comfort, and professional support seamlessly
                intertwine to create a true sanctuary for your loved ones.
              </p>
            </GsapFadeUp>

            <GsapFadeUp className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
              <ImageAnim
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                alt="Warm caregiver interaction"
                className="w-full max-w-md aspect-[4/5] shadow-2xl"
              />
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* Purpose and Vision Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            <GsapFadeUp className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-[#544e47] px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand-bg rounded-full" /> Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight font-display font-normal mb-6">
                To provide unwavering support and enrich daily living.
              </h2>
              <p className="text-sm md:text-base text-brand-muted-dark leading-relaxed">
                Our mission is to deliver deeply personalized, compassionate
                care that honors the unique history and individuality of each
                resident. We exist to alleviate the physical and emotional
                burdens of aging and recovery, replacing them with a nurturing
                atmosphere where residents feel genuinely valued,
                unconditionally safe, and at peace. Every action we take is
                guided by empathy and professional excellence.
              </p>
            </GsapFadeUp>

            <GsapFadeUp className="flex flex-col items-start lg:mt-24">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-[#544e47] px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight font-display font-normal mb-6">
                Setting a new standard for adult family care.
              </h2>
              <p className="text-sm md:text-base text-brand-muted-dark leading-relaxed">
                We envision a community where institutional, impersonal care is
                entirely replaced by warm, residential sanctuaries. A future
                where families never have to compromise between top-tier medical
                assistance and a comfortable, homelike environment. We are
                continuously striving to be the benchmark for adult family homes,
                recognized for our innovative care models and profound dedication
                to human dignity.
              </p>
            </GsapFadeUp>
          </div>
        </div>
        {/* @ts-expect-error — Iconify web component */}
        <iconify-icon icon="solar:stars-linear" width="400" height="400" class="absolute -right-32 -bottom-32 text-brand-bg opacity-[0.02] pointer-events-none" style={{ strokeWidth: "1px" }} />
      </section>

      {/* Our Journey Section */}
      <section className="relative bg-brand-bg text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="text-center mb-24">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ THE HISTORY ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal">
              Our Journey
            </h2>
          </GsapFadeUp>

          <div className="relative border-l border-brand-border ml-4 md:ml-0 md:pl-0 space-y-20">
            {ABOUT_MILESTONES.map((m, i) => (
              <GsapFadeUp key={m.year} className="relative pl-10 md:pl-16">
                <div
                  className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-brand-bg ${
                    i === 0
                      ? "bg-brand-accent"
                      : "bg-brand-border transition-colors duration-500 hover:bg-brand-accent"
                  }`}
                />
                <p className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3">
                  {m.year} &bull; {m.label}
                </p>
                <h3 className="text-2xl md:text-3xl tracking-tight font-display font-normal mb-4">
                  {m.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {m.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
                [ THE CARE TEAM ]
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal">
                Meet the hearts behind the home.
              </h2>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm mb-2">
              Our facility is only as exceptional as the people who run it. We
              employ highly trained, empathetic professionals dedicated to
              uplifting our residents every single day.
            </p>
          </GsapFadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {ABOUT_TEAM.map((person) => (
              <GsapFadeUp key={person.name} className="group flex flex-col gap-6">
                <div className="w-full aspect-[4/5] bg-brand-border rounded-sm overflow-hidden relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 object-top"
                  />
                </div>
                <div>
                  <h3 className="text-2xl tracking-tight font-display font-normal">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium tracking-widest text-brand-accent uppercase mt-2">
                    {person.role}
                  </p>
                  <p className="text-sm text-brand-muted mt-4 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 border-t border-brand-border-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <GsapFadeUp className="flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-6">
                  [ NEXT STEPS ]
                </span>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal mb-8 max-w-md">
                  Take action today.
                </h2>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  Choosing the right home is a significant decision. Let&apos;s
                  start a conversation about your loved one&apos;s unique needs
                  and how our dedicated family can seamlessly support yours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-12 border-t border-brand-border-dark pt-10 mt-8 lg:mt-auto">
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    General Inquiries
                  </span>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    Direct Line
                  </span>
                  <a href={`tel:${SITE.phone2}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.phone2}
                  </a>
                </div>
              </div>
            </GsapFadeUp>

            <GsapFadeUp>
              <ContactForm variant="cta" />
            </GsapFadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify About page renders**

Visit `http://localhost:3000/about`. Expected: Full about page with hero image animation, timeline, team cards, CTA.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: build About Us page from HTML source"
```

---

## Task 10: Build Services Page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Write `app/services/page.tsx`**

Convert `generated-page (4).html` faithfully.

```tsx
"use client";

import GsapFadeUp from "@/components/gsap-fade-up";
import {
  CARE_APPROACH_STEPS,
  CORE_SERVICES,
  SPECIALTIES,
  AMENITIES,
} from "@/lib/constants";

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
              [ OUR SERVICES ]
            </span>
            <h1 className="text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
              Comprehensive care, <br />
              <span className="text-brand-accent">tailored to you.</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl mb-16">
              We offer a wide spectrum of personalized services designed to
              support physical health, cognitive well-being, and emotional
              fulfillment in a warm, residential setting.
            </p>
          </GsapFadeUp>

          <GsapFadeUp className="w-full aspect-[21/9] md:aspect-[24/9] bg-brand-subtle rounded-sm overflow-hidden relative mt-8">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
              alt="Serene home environment"
              className="w-full h-full object-cover"
            />
          </GsapFadeUp>
        </div>
      </section>

      {/* Care Approach Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <GsapFadeUp className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
                [ METHODOLOGY ]
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal mb-6">
                Our Care Approach
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                We don&apos;t believe in a one-size-fits-all model. Our approach
                is deeply iterative and collaborative, ensuring every
                resident&apos;s care plan evolves exactly as their needs do.
              </p>
            </GsapFadeUp>

            <div className="lg:col-span-8 space-y-16">
              {CARE_APPROACH_STEPS.map((step, i) => (
                <GsapFadeUp
                  key={step.number}
                  className={`flex flex-col md:flex-row gap-8 items-start ${
                    i < CARE_APPROACH_STEPS.length - 1
                      ? "pb-16 border-b border-brand-border"
                      : ""
                  }`}
                >
                  <span className="text-3xl tracking-tight font-normal text-brand-accent font-display">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl tracking-tight font-display font-normal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </GsapFadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative bg-brand-bg py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ DAILY LIVING ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal mb-6">
              Core Services
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              Our foundation is built on uncompromising daily support. We handle
              the complexities of care so residents can focus on living joyfully.
            </p>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service) => (
              <GsapFadeUp
                key={service.title}
                className="bg-white/40 border border-brand-border p-8 rounded-sm hover:bg-white/60 transition-colors"
              >
                {/* @ts-expect-error — Iconify web component */}
                <iconify-icon icon={service.icon} width="24" height="24" class="text-brand-accent mb-6 block" style={{ strokeWidth: "1.5px" }} />
                <h3 className="text-xl tracking-tight font-display font-normal mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {service.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <GsapFadeUp className="mb-20">
            <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-4">
              [ ADVANCED CARE ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal mb-6 max-w-2xl">
              Our Specialties
            </h2>
          </GsapFadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {SPECIALTIES.map((s) => (
              <GsapFadeUp key={s.title} className="group flex flex-col">
                <div className="w-full aspect-video bg-brand-darker rounded-sm overflow-hidden mb-8 border border-brand-border-dark">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <h3 className="text-2xl tracking-tight font-display font-normal mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-brand-muted-dark leading-relaxed mb-6">
                  {s.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs text-brand-bg">
                      {/* @ts-expect-error — Iconify web component */}
                      <iconify-icon icon="solar:check-circle-linear" class="text-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </GsapFadeUp>
            ))}
          </div>
        </div>
        {/* @ts-expect-error — Iconify web component */}
        <iconify-icon icon="solar:medical-kit-linear" width="400" height="400" class="absolute -left-32 -top-32 text-brand-bg opacity-[0.02] pointer-events-none" style={{ strokeWidth: "1px" }} />
      </section>

      {/* Amenities Section */}
      <section className="relative bg-brand-bg py-32 z-10 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="text-center mb-20">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ THE ENVIRONMENT ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal">
              Facility Amenities
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed mt-6 max-w-xl mx-auto">
              Comfort is integral to well-being. Our home is intentionally
              designed to provide the highest standards of safety without
              compromising on elegance and warmth.
            </p>
          </GsapFadeUp>

          <div className="border-t border-brand-border">
            {AMENITIES.map((a) => (
              <GsapFadeUp
                key={a.title}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-brand-border gap-4 transition-colors hover:bg-white/40 px-4 -mx-4 rounded-sm cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-subtle rounded-full text-brand-dark">
                    {/* @ts-expect-error — Iconify web component */}
                    <iconify-icon icon={a.icon} width="24" height="24" style={{ strokeWidth: "1.5px" }} />
                  </div>
                  <h3 className="text-xl tracking-tight font-display font-normal">
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-muted md:text-right max-w-sm">
                  {a.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="relative bg-brand-accent text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          {/* @ts-expect-error — Iconify web component */}
          <iconify-icon icon="solar:quote-left-linear" width="48" height="48" class="text-brand-bg/30 mb-8 inline-block" style={{ strokeWidth: "1.5px" }} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] font-display font-normal mb-8">
            Care is not merely a service we provide; it is the environment we
            cultivate. We believe every individual deserves to age with profound
            dignity, surrounded by unwavering warmth.
          </h2>
          <p className="text-sm font-medium tracking-widest uppercase mt-12 text-brand-bg/80">
            — The Flower Family Promise
          </p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify Services page renders**

Visit `http://localhost:3000/services`. Expected: All 6 sections render correctly.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: build Services page from HTML source"
```

---

## Task 11: Build Gallery Page

**Files:**
- Create: `app/gallery/page.tsx`

- [ ] **Step 1: Write `app/gallery/page.tsx`**

Convert `generated-page (5).html` faithfully. This page has complex per-item GSAP animations and mouse parallax.

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        ".gsap-hero-gallery",
        { y: 50, opacity: 0, rotateX: -20, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // Scattered fly-in for gallery items
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = 150 + Math.random() * 250;
        const randomRot = (Math.random() - 0.5) * 30;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: randomX,
            y: randomY,
            rotation: randomRot,
            scale: 0.6,
            filter: "blur(15px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Mouse parallax on gallery wrapper
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(wrapper, { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="gsap-hero-gallery text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
              [ OUR HOME ]
            </span>
            <h1 className="gsap-hero-gallery text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
              Life in <span className="text-brand-accent">vivid detail.</span>
            </h1>
            <p className="gsap-hero-gallery text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl mb-8">
              Explore our gallery to experience the vibrant daily life,
              beautifully serene environments, and heartfelt moments of
              connection that define our community.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="relative pb-32 z-10">
        <div ref={wrapperRef} className="w-full">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="break-inside-avoid mb-4 relative rounded-sm overflow-hidden group border border-brand-border/30 bg-brand-subtle"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify Gallery page renders**

Visit `http://localhost:3000/gallery`. Expected: Masonry grid with 28 images, scattered fly-in animation on scroll, mouse parallax.

- [ ] **Step 3: Commit**

```bash
git add app/gallery/page.tsx
git commit -m "feat: build Gallery page with masonry grid and GSAP animations"
```

---

## Task 12: Build Contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write `app/contact/page.tsx`**

Convert `generated-page (1).html` faithfully. Includes 3D map animation.

```tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapFadeUp from "@/components/gsap-fade-up";
import ContactForm from "@/components/contact-form";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        ".gsap-hero-contact",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // 3D Map animation
      gsap.fromTo(
        "#map-container",
        {
          rotationX: 35,
          rotationY: -10,
          scale: 0.85,
          opacity: 0,
          y: 100,
        },
        {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#map-container",
            start: "top 95%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-brand-border pb-12">
            <div className="max-w-3xl">
              <span className="gsap-hero-contact text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
                [ GET IN TOUCH ]
              </span>
              <h1 className="gsap-hero-contact text-6xl lg:text-8xl tracking-tight leading-none font-display font-normal">
                We&apos;re here <br className="hidden sm:block" />{" "}
                <span className="text-brand-accent">to help.</span>
              </h1>
            </div>
            <p className="gsap-hero-contact text-base md:text-lg text-brand-muted leading-relaxed max-w-sm pb-2">
              Reach out to discuss care options, schedule a tour, or ask any
              questions about our family home.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Contact Details */}
      <section className="relative py-12 lg:py-20 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <GsapFadeUp>
              <h2 className="text-3xl lg:text-4xl tracking-tight font-display font-normal mb-8 text-brand-dark">
                Send a message
              </h2>
              <ContactForm variant="contact" />
            </GsapFadeUp>

            {/* Info */}
            <GsapFadeUp className="flex flex-col justify-center gap-12 lg:pl-16 lg:border-l border-brand-border">
              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon="solar:letter-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Email Us
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-2xl lg:text-3xl tracking-tight font-display font-normal hover:text-brand-accent transition-colors"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon="solar:phone-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Call Us
                </span>
                <a
                  href={`tel:${SITE.phone1.replace(/[^+\d]/g, "")}`}
                  className="text-2xl lg:text-3xl tracking-tight font-display font-normal hover:text-brand-accent transition-colors"
                >
                  {SITE.phone1}
                </a>
                <p className="text-sm text-brand-muted mt-2">{SITE.hours}</p>
              </div>

              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  {/* @ts-expect-error — Iconify web component */}
                  <iconify-icon icon="solar:map-point-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Visit Us
                </span>
                <p className="text-2xl lg:text-3xl tracking-tight font-display font-normal leading-snug">
                  605 74th St SW
                  <br />
                  Everett, WA 98203
                </p>
              </div>
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* 3D Animated Google Map Section */}
      <section className="relative py-12 lg:py-24 z-10 overflow-hidden" style={{ perspective: "1500px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            id="map-container"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-brand-subtle shadow-[0_20px_50px_rgba(59,54,49,0.1)] origin-bottom transform-gpu overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-brand-dark/5 pointer-events-none z-10" />
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=605+74th+St+SW+Everett+WA+98203`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) sepia(0.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
```

**Note:** The Google Maps embed URL uses the free embed approach. If the Maps Embed API key doesn't work, fall back to the no-key URL format:
```
https://www.google.com/maps?q=605+74th+St+SW+Everett+WA+98203&output=embed
```

- [ ] **Step 2: Verify Contact page renders**

Visit `http://localhost:3000/contact`. Expected: Hero, form with Web3Forms integration, contact details with real info, 3D animated map.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: build Contact page with Web3Forms and 3D map animation"
```

---

## Task 13: Verify Full Build and Cross-Page Navigation

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 2: Test all routes**

```bash
npm run start
```

Visit each page and verify:
- `http://localhost:3000` — Home page renders fully
- `http://localhost:3000/about` — About page renders fully
- `http://localhost:3000/services` — Services page renders fully
- `http://localhost:3000/gallery` — Gallery page with 28 images
- `http://localhost:3000/contact` — Contact page with form and map

- [ ] **Step 3: Verify navigation**

Click each nav link and confirm:
- Links navigate between pages (no full page reload — client-side navigation)
- Active page highlighted in navbar
- Mobile menu opens/closes and navigates correctly
- "SCHEDULE A TOUR" links go to `/contact`
- Footer "CONTACT US" button goes to `/contact`

- [ ] **Step 4: Test contact form submission**

On the Contact page, fill out the form and submit. Expected: Web3Forms receives the submission, success message shows.

- [ ] **Step 5: Commit any fixes**

If any issues found during verification, fix and commit:

```bash
git add -A
git commit -m "fix: address issues found during full-site verification"
```

---

## Task 14: Clean Up and Final Commit

**Files:**
- Modify: `.gitignore` (if needed)

- [ ] **Step 1: Ensure `.superpowers/` is in `.gitignore`**

Check that `.gitignore` includes `.superpowers/` to avoid committing brainstorm session files.

- [ ] **Step 2: Run final build check**

```bash
npm run build
```

Expected: Clean build, no warnings.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: finalize Next.js conversion — all 5 pages complete"
```
