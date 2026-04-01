# Flower AFH — Next.js Conversion Design Spec

## Overview

Faithful conversion of 5 standalone HTML pages into a Next.js 14 App Router project. Preserves the exact design, content, sections, and GSAP animations while adding proper routing, shared layout, real business info, and Web3Forms integration.

## Source Mapping

| Route | Source File | Page Title |
|-------|------------|------------|
| `/` | `generated-page (2).html` | Home — hero with giant "FLOWER" text, why choose us, expertise showcase, testimonials, FAQ, CTA |
| `/about` | `generated-page (3).html` | About Us — hero with column-slice image, mission/vision, timeline, team cards, CTA with form |
| `/services` | `generated-page (4).html` | Services — care approach (4 steps), 6 core services grid, 3 specialties with images, amenities list, philosophy quote |
| `/gallery` | `generated-page (5).html` | Gallery — masonry grid with 28 images, scattered fly-in GSAP animations, mouse parallax |
| `/contact` | `generated-page (1).html` | Contact — Web3Forms contact form, contact details, 3D animated Google Map |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 (installed via npm, not CDN)
- **Animations:** GSAP + ScrollTrigger (installed via npm)
- **Icons:** Iconify via CDN script (`https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js`)
- **Fonts:** Inter (via Google Fonts or next/font), Google Sans Flex (via Google Fonts link)
- **Forms:** Web3Forms (key: `cd9bdd93-9d53-4559-9d71-340c10af26dc`)
- **Deployment:** Vercel

## Design System (from existing HTML)

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| bg-primary | `#ece9e4` | Main page background |
| bg-dark | `#3b3631` | Dark sections, text color |
| bg-darker | `#322d28` | Footer, dark cards |
| accent | `#8c7b66` | Headings accent, links, highlights |
| text-muted | `#6b645c` | Body text on light backgrounds |
| text-muted-dark | `#a69c91` | Body text on dark backgrounds |
| border-light | `#cdc9c1` | Borders on light sections |
| border-dark | `#4a453f` | Borders on dark sections |
| bg-subtle | `#dfdcd5` | Subtle backgrounds, image placeholders |

### Typography
- **Body:** Inter, 400/500 weight
- **Headings:** Google Sans Flex, normal weight
- **Sizes:** Tailwind defaults — hero titles `text-5xl` to `text-8xl`, section headings `text-3xl` to `text-5xl`, body `text-sm` to `text-base`
- **Labels:** `text-xs`, uppercase, `tracking-widest`, accent color

### Spacing
- Max content width: `max-w-7xl` (1280px)
- Page padding: `px-6 lg:px-12`
- Section padding: `py-24` to `py-32`

## Project Structure

```
app/
  layout.tsx          # Root layout: HTML shell, fonts, Iconify script, Navbar, Footer
  page.tsx            # Home page
  about/page.tsx      # About Us page
  services/page.tsx   # Services page
  gallery/page.tsx    # Gallery page
  contact/page.tsx    # Contact page
  globals.css         # Tailwind directives + any custom CSS (details marker hide, etc.)

components/
  navbar.tsx          # Shared header with nav links + mobile menu
  footer.tsx          # Shared footer with real business info
  mobile-menu.tsx     # Hamburger menu for mobile (not in original HTML — adding for usability)
  gsap-fade-up.tsx    # Reusable client component wrapper for scroll-triggered fade-up
  image-anim.tsx      # Column-slice parallax + blur image animation (Home hero, About hero, Expertise)
  contact-form.tsx    # Web3Forms form with success/error states (used on Contact, Home CTA, About CTA)

lib/
  constants.ts        # Business info, nav links, image URLs, service data, FAQ data, testimonials

tailwind.config.ts    # Tailwind config with custom colors matching design system
next.config.mjs       # Image domains config (unsplash, ibb.co, supabase)
```

## Shared Components

### Navbar (`components/navbar.tsx`)
- Client component (needs mobile menu state)
- Horizontal nav: Home, About Us, Services, Gallery, Contact
- Links use Next.js `<Link>` pointing to real routes (`/`, `/about`, `/services`, `/gallery`, `/contact`)
- Active page highlighted with `text-[#8c7b66]` and `font-medium`
- Right side: "SCHEDULE A TOUR" link pointing to `/contact`
- Mobile: hamburger button toggling `MobileMenu` overlay
- Sticky/fixed behavior not required (original HTML uses static `relative` header)

### Footer (`components/footer.tsx`)
- Dark background (`#322d28`)
- Top bar: "ESTABLISHED CARE" / "Compassion // Dignity // Respect" / "CONTACT US" button
- Bottom bar: copyright, real address (605 74th St SW, Everett, WA 98203), social links (FACEBOOK, DIRECTORIES as `#`)
- Giant "FLOWER" watermark text at bottom (`opacity-[0.03]`, `font-size: 20vw`)

### GsapFadeUp (`components/gsap-fade-up.tsx`)
- Client component wrapping children in a `<div>` with GSAP ScrollTrigger animation
- Animation: `y: 40 -> 0`, `opacity: 0 -> 1`, `duration: 1.2`, `ease: power3.out`
- Trigger: `start: "top 85%"`
- Used across all pages for section reveals

### ImageAnim (`components/image-anim.tsx`)
- Client component replicating the column-slice parallax + blur effect
- Splits image into 4 vertical columns via `clipPath`
- Each column has alternating parallax direction and scroll-linked blur removal
- Used on: Home hero, Home expertise images, About hero image

### ContactForm (`components/contact-form.tsx`)
- Client component with form state management
- Fields vary by usage:
  - Contact page: first name, last name, email, phone, message
  - Home/About CTA: name, phone, email, care type dropdown, message, terms checkbox
- Submits to Web3Forms API (`https://api.web3forms.com/submit`)
- Shows success message on submission, error message on failure

## Page Details

### Home (`/`)
Sections in order:
1. **Hero** — giant "FLOWER" background text, column-animated hero image, tagline, mission blurb, 24/7 stat, image row
2. **Why Choose Us** — dark section with heading, certified badge, personalized attention blurb, 3 stat cards (1:3 ratio, 24 hrs, 100%)
3. **Expertise** — dark section with 3 image-anim showcase blocks (Assisted Living, Memory Care, Respite Care), "TAILORED CARE PLANS" heading
4. **Testimonials** — 3 testimonial cards with quotes and avatars
5. **FAQ** — 5 accordion items using native `<details>` elements
6. **CTA** — dark section with contact form (name, phone, email, care type, message, terms)

### About (`/about`)
Sections in order:
1. **Hero** — heading with column-animated image
2. **Purpose & Vision** — dark section, two-column with mission and vision
3. **Our Journey** — timeline with 3 milestones (2018, 2020, 2023)
4. **Our People** — 3 team member cards with grayscale-to-color hover images
5. **CTA** — dark section with contact form (same as Home CTA)

### Services (`/services`)
Sections in order:
1. **Hero** — centered heading with full-width image
2. **Care Approach** — sticky header + 4 scrolling numbered steps
3. **Core Services** — 6 service cards in 3-column grid with Iconify icons
4. **Specialties** — 3 specialty cards (Memory Care, Respite & Recovery, Palliative & Hospice) with images and checklists
5. **Amenities** — 5 amenity rows with icons
6. **Philosophy Quote** — full-width accent-colored section with blockquote

### Gallery (`/gallery`)
Sections in order:
1. **Hero** — centered heading with 3D perspective text animation
2. **Masonry Grid** — 4-column CSS columns layout, 28 images from ibb.co
3. GSAP: scattered fly-in animation per image, mouse-move parallax on wrapper

### Contact (`/contact`)
Sections in order:
1. **Hero** — "We're here to help" heading
2. **Form + Details** — two-column: Web3Forms form (left), contact info with real email/phone/address (right)
3. **3D Map** — Google Maps iframe with scroll-triggered 3D rotation reveal, pointed to 605 74th St SW Everett WA 98203

## Business Data Replacements

All placeholder data in the HTML files gets replaced:

| Placeholder | Real Value |
|-------------|-----------|
| `hello@flowerhome.com` | `abeba@flowerafh.com` |
| `care@flowerhome.com` | `abeba@flowerafh.com` |
| `(206) 555-0123` | `(206) 504-0037` |
| `+1 (555) 123-4567` | `(206) 313-1516` |
| `123 Healing Path Way, Seattle, WA 98101` | `605 74th St SW, Everett, WA 98203` |
| Google Maps iframe (generic Seattle) | Embed for `605 74th St SW, Everett, WA 98203` |
| `Mon-Fri from 8am to 5pm` | `Available 24/7 for inquiries` |

## Image Strategy

All images kept as external URLs (no local files):
- **Unsplash** images: `images.unsplash.com`
- **ibb.co** images: `i.ibb.co`
- **Supabase** images: `hoirqrkdgbmvpwutwuwj.supabase.co`

Using standard `<img>` tags (not `next/image`) to faithfully match current rendering. Configure `next.config.mjs` with `images.unoptimized: true` since we're not using the Image component.

## Mobile Menu

The original HTML pages have no mobile hamburger menu — nav links are hidden on small screens. Adding a basic mobile menu:
- Hamburger icon button visible below `lg` breakpoint
- Full-screen overlay with vertical nav links
- Close button
- Same warm/dark styling as the rest of the site

## Animations Summary

| Animation | Where Used | Method |
|-----------|-----------|--------|
| Fade up on scroll | All pages, most sections | GSAP ScrollTrigger — `GsapFadeUp` component |
| Column-slice parallax + blur | Home hero, Home expertise, About hero | GSAP ScrollTrigger — `ImageAnim` component |
| Hero text entrance | Home, Gallery, Contact | GSAP tween on load — `y/opacity` with stagger |
| Scattered fly-in | Gallery images | GSAP ScrollTrigger per item — random x/y/rotation/scale/blur |
| Mouse parallax | Gallery grid wrapper | GSAP `mousemove` listener |
| 3D map reveal | Contact page | GSAP ScrollTrigger scrub — `rotationX/Y/scale/opacity` |
| FAQ accordion | Home page | Native `<details>` element with CSS transitions |

## Deployment

- Deploy to Vercel
- No environment variables needed (Web3Forms key is client-side)
- No `vercel.json` needed (Next.js auto-detected)
