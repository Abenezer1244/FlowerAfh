# Flower Adult Family Homes — Website Design Spec

## Overview

A hyper-premium, cinematic scrollytelling website for Flower Adult Family Homes, a licensed Adult Family Home in Everett, WA. The experience combines scroll-driven image transitions, warm editorial typography, and deeply human storytelling across 5 pages.

**Owners:** Tesfaye and Abeba
**Location:** 605 74th St SW, Everett, WA 98203
**Phone:** (206) 504-0037 | (206) 313-1516
**Email:** abeba@flowerafh.com
**Capacity:** Up to 6 residents
**Care types:** General aging/ADL support + memory care (dementia/Alzheimer's)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (`useScroll`, `useTransform`, `AnimatePresence`)
- **Image optimization:** Next.js `<Image>` component
- **Contact form:** Web3Forms (access key from dashboard: cd9bdd93-9d53-4559-9d71-340c10af26dc)
- **Deployment:** Vercel
- **Fonts:** Playfair Display (Google Fonts, weights 400/600/700) + Inter (Google Fonts, weights 400/500/600)

---

## Project Structure

```
flower-afh/
├── app/
│   ├── layout.tsx            # Root layout — fonts, navbar, footer
│   ├── page.tsx              # Home (scrollytelling hero)
│   ├── about/page.tsx        # About Us
│   ├── services/page.tsx     # Services
│   ├── gallery/page.tsx      # Gallery
│   └── contact/page.tsx      # Contact Us
├── components/
│   ├── navbar.tsx            # Sticky glassmorphism nav
│   ├── footer.tsx            # Site-wide footer
│   ├── scroll-section.tsx    # Reusable scroll-animated section wrapper
│   ├── image-crossfade.tsx   # Scroll-driven image crossfade sequence
│   ├── parallax-image.tsx    # Ken Burns parallax image component
│   ├── service-card.tsx      # Photo-backed service card
│   ├── gallery-grid.tsx      # Masonry grid with filtering
│   ├── lightbox.tsx          # Full-screen image viewer
│   ├── contact-form.tsx      # Web3Forms-powered form
│   ├── value-card.tsx        # Core values display
│   └── team-card.tsx         # Caregiver profile card
├── public/
│   └── images/
│       ├── hero/             # Hero and exterior shots
│       ├── bedrooms/         # Bedroom photography
│       ├── bathrooms/        # Bathroom photography
│       ├── dining/           # Dining room photography
│       ├── living/           # Living spaces photography
│       └── community/        # Caregiver, resident, activity photos
├── lib/
│   └── constants.ts          # Brand colors, contact info, image paths, copy
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Brand & Visual Direction

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FAFAF8` | Primary background (light mode) |
| `bg-dark` | `#080806` | Dark hero sections |
| `bg-card` | `#F4F1EC` | Card surfaces, alternate sections |
| `bg-warm-blush` | `#F5EDE0` | Subtle radial gradient target behind hero content |
| `text-heading` | `#1A1A18` | Headings — deep warm charcoal |
| `text-body` | `#4A4A48` | Body text — muted warm gray |
| `accent-green` | `#2D6A4F` | Primary accent — forest green (safety, healing) |
| `accent-green-light` | `#52B788` | CTA gradient end, fresh green |
| `accent-gold` | `#C9A84C` | Premium highlights, trust accents |
| `border-warm` | `#E8E4DE` | Input borders, subtle dividers |

### Typography

- **Headings:** Playfair Display — bold serif, large scale, emotionally resonant
- **Body:** Inter — 16–18px, comfortable line-height (1.6–1.7), warm muted color
- **Nav links:** Inter, 14px, letter-spaced (`tracking-wide`)
- **Style:** Editorial, generous white space, dignified hierarchy

### Layout Principles

- Full-bleed, edge-to-edge photography
- Generous negative space — no clutter
- Images float within the page — backgrounds complement warm photo tones
- Subtle radial gradients (not harsh) to blend hero content
- Mobile-first responsive design

---

## Navbar

### Structure
- **Left:** "Flower" in Playfair Display medium weight, "Adult Family Home" smaller beside it
- **Center:** Home | About Us | Services | Gallery | Contact Us — Inter, 14px, `tracking-wide`
- **Right:** "Schedule a Tour" pill button — forest green gradient border (`#2D6A4F` → `#52B788`), soft glow on hover

### Scroll Behavior
- **At top:** Fully transparent, blends with hero
- **After ~50px scroll:** Warm-white glassmorphism fades in — `backdrop-blur-xl`, `bg-[#FAFAF8]/80`
- **Transition:** ~300ms ease

### Mobile
- Hamburger menu icon
- Opens full-screen warm overlay with centered navigation links + "Schedule a Tour" CTA
- Smooth open/close animation via Framer Motion

---

## Footer

- **Background:** `#1A1A18` (warm charcoal)
- **Top accent:** Subtle gold line (`#C9A84C`)
- **Three columns:**
  - Quick Links: Home, About Us, Services, Gallery, Contact Us
  - Contact Info: address, both phone numbers, email
  - Hours: "Available 24/7 for inquiries | Tours by appointment"
- **Bottom bar:** "© 2026 Flower Adult Family Homes. All rights reserved." + "Licensed Adult Family Home — Washington State"

---

## Page 1: Home (Scrollytelling)

The home page is one tall scroll container (~500vh). Framer Motion `useScroll` tracks scroll progress on the container ref. Each beat maps to a `useTransform` range.

### Beat 1 — Hero (0–15% scroll)
- **Visual:** Full-bleed warm living room or exterior photo, 100vh, Ken Burns zoom (scale 1.0 → 1.05 over beat duration)
- **Copy (centered, staggered fade-in):**
  - Headline: "Where Every Day Feels Like Home" — Playfair Display, ~56px
  - Subtitle: "Compassionate care. Warm spaces. Dignity in every detail." — Inter, ~20px
  - Supporting: "A licensed Adult Family Home serving Everett, Washington — where your loved one is family."
- **CTAs:** "Schedule a Tour" (green gradient fill) + "Learn About Our Care" (ghost outline)
- **Scroll indicator:** Animated chevron at bottom

### Beat 2 — Care Reveal (15–40% scroll)
- **Visual:** Scroll-driven crossfade sequence: exterior → dining room → bedroom → bathroom. Each image full-bleed, opacity driven by scroll position. Subtle Ken Burns parallax (vertical shift + scale) on each.
- **Copy (left-aligned, slides in from left, synced to scroll):**
  - "Thoughtfully designed for comfort and safety."
  - "Every room crafted with accessibility, warmth, and dignity — from wide-doorframe bedrooms to spa-inspired bathrooms."
  - "Our home is their home. Every detail matters."

### Beat 3 — Care & Community (40–65% scroll)
- **Visual:** Caregiver/resident interaction photos, seniors playing games, group dining. Soft warm overlay gradient on image edges for blending.
- **Copy (right-aligned, slides in from right):**
  - "Care that goes beyond the clinical."
  - Staggered bullet points:
    - "Personalized care plans tailored to each resident."
    - "24/7 caregiver presence — never alone, always supported."
    - "Activities, meals, and moments designed to bring joy."

### Beat 4 — Home Quality (65–85% scroll)
- **Visual:** Close-up shots — clean bathroom, made bed, dining table set for a meal
- **Layout:** Centered editorial — image above, copy below
- **Copy:**
  - "A home built for living well."
  - "Licensed, inspected, and lovingly maintained — our spaces meet the highest Washington State AFH standards while feeling like a true home."

### Beat 5 — Reassembly & CTA (85–100% scroll)
- **Visual:** Warm full-bleed photo — golden hour feel, caregiver moment
- **Copy (centered, fade-in):**
  - "Your family deserves the very best."
  - "Let's talk about care that feels like family."
- **CTAs:** "Schedule a Tour" + "Contact Us Today"
- **Micro-copy:** "Serving families across Everett and surrounding Washington communities."

### Technical Notes
- Images preloaded for next beat to avoid pop-in
- `will-change: transform, opacity` on animated elements for GPU acceleration
- Each beat's animations are `useTransform` mapped to scroll progress ranges

---

## Page 2: About Us

### Hero (70vh)
- Warm exterior shot or caregiver portrait, subtle parallax
- "Built on compassion. Driven by purpose." — Playfair Display, centered
- Soft gradient overlay at bottom blending into content

### Our Story
- **Layout:** Split — left photo (Tesfaye & Abeba portrait or placeholder), right narrative
- **Story arc:** Tesfaye and Abeba immigrated from Ethiopia. They faced years of hardship building a life in America — long hours, language barriers, starting over. Through it all, their faith sustained them, and so did a deep cultural value: that caring for elders is sacred. That calling led them to open Flower Adult Family Home — not a facility, but their home, where every resident is treated with the same dignity and love they'd give their own parents.
- **Closing line:** "We didn't build a facility. We opened our home."
- **Tone:** Warm, humble, faith-grounded, resilient — never clinical or corporate

### Our Team
- Horizontal row of 3–4 caregiver profile cards
- Each card: warm photo, name, role, one-line bio
- Hover: card lifts with soft shadow, slight scale
- Placeholder names/roles for now — easy to update in `lib/constants.ts`

### Our Values
- 4 cards in a grid on warm background (`#F4F1EC`):
  - **Dignity** — "Every person deserves respect, privacy, and choice — no matter their age or condition."
  - **Safety** — "A secure, accessible environment designed to prevent harm and promote confidence."
  - **Family** — "This is a home, not a facility. Residents are family, and families are always welcome."
  - **Joy** — "Meaningful activities, warm meals, and genuine connection — because happiness is essential to health."
- Each card: forest green icon at top, name in Playfair Display, description in Inter
- Staggered fade-in on scroll

### Licensing & Trust
- Horizontal trust bar with badges/stats:
  - "Washington State Licensed"
  - Years of experience
  - "Up to 6 Residents"
  - "24/7 Care"
- Subtle gold accent underlines

### CTA
- "Come see the difference in person." → "Schedule a Tour" button

---

## Page 3: Services

### Hero (60vh)
- Clean bedroom or living room shot, subtle parallax
- "Comprehensive care, delivered with heart." — Playfair Display, centered
- "Every service tailored to your loved one's unique needs." — Inter

### Service Cards
- **Layout:** 2-column grid on desktop, single column on mobile
- **Card design:** Real photo background with warm dimmed overlay, white text, forest green left border accent
- **Hover:** Overlay lightens slightly, card scales 1.02
- **8 cards:**

1. **Personal Care & ADL Assistance** — "Bathing, dressing, grooming, and daily routines — handled with patience and respect."
2. **Medication Management** — "Accurate, timely medication administration overseen by trained caregivers."
3. **Nutritious Home-Cooked Meals** — "Fresh, balanced meals prepared daily — with cultural and dietary preferences honored."
4. **Mobility & Fall Prevention** — "Safe transfers, walking assistance, and an environment designed to prevent falls."
5. **Memory Care & Cognitive Support** — "Specialized routines and engagement for residents living with dementia or Alzheimer's."
6. **Social Activities & Engagement** — "Games, music, conversation, and community — because connection is care."
7. **24/7 Caregiver Availability** — "Round-the-clock presence so no one is ever alone when they need support."
8. **Transportation & Appointments** — "Rides to medical visits, errands, and outings — coordinated and stress-free."

### Photo Mapping
- Personal Care → bathroom photo
- Medication → bedroom/caregiver photo
- Meals → dining room photo
- Mobility → bedroom/hallway photo
- Memory Care → activity/engagement photo
- Activities → seniors playing games photo
- 24/7 Care → caregiver portrait
- Transportation → exterior photo

### Bottom CTA
- Warm background (`#F4F1EC`)
- "Every service designed around your loved one's unique needs."
- "Talk to Our Care Team" → links to `/contact`

---

## Page 4: Gallery

### Hero (text only)
- Warm background, no full-bleed photo
- "A home you'll feel before you see it." — Playfair Display, centered
- "Every photo is a promise — warmth, cleanliness, and dignity in every corner." — Inter

### Category Filter Tabs
- Centered horizontal tabs: **All** | **Bedrooms** | **Bathrooms** | **Dining** | **Living Spaces** | **Community**
- Active tab: forest green underline with smooth slide transition
- Sticky below navbar on scroll

### Masonry Grid
- **Layout:** 3 columns desktop, 2 tablet, 1 mobile
- **Load animation:** Staggered fade-in on scroll (50ms delay between each image)
- **Hover:** Subtle warm overlay with room name label, scale 1.03
- **Filter animation:** `AnimatePresence` — cards exit with fade + scale down, enter with fade + scale up

### Lightbox
- Click image → full-screen dark overlay with backdrop blur
- Large centered image, smooth scale-in animation
- Prev/Next arrows on sides
- Keyboard support: left/right arrows to navigate, ESC to close
- Swipe support on mobile (touch gesture)
- Image counter: "3 / 24"
- Close button top-right (X icon)

### Image Categories (from provided photo set)
- **Bedrooms:** bedroom interiors, made beds, room details
- **Bathrooms:** bathroom fixtures, clean tiles, accessibility features
- **Dining:** dining table, meal settings, kitchen views
- **Living Spaces:** living room, exterior shots, common areas
- **Community:** seniors playing games, caregiver interactions, group moments

All ~30 photos from the imgbb collection downloaded and organized into `/public/images/` subdirectories.

---

## Page 5: Contact Us

### Layout
- **Desktop:** Split screen — 55% left (full-height warm photo, Ken Burns), 45% right (form)
- **Mobile:** Photo becomes 40vh hero above the stacked form

### Form Header
- "Let's start the conversation." — Playfair Display
- "Reach out today — we're here to answer every question and help your family find peace of mind." — Inter

### Form (Web3Forms)
- **Hidden field:** `access_key` = `cd9bdd93-9d53-4559-9d71-340c10af26dc`
- **Fields:**
  - Name — text input, required
  - Phone — tel input, required
  - Email — email input, required
  - Relationship to Resident — dropdown: "I am the resident" | "Son/Daughter" | "Spouse" | "Other Family Member" | "Professional/Case Manager" | "Other"
  - Message — textarea
  - Preferred Tour Date — date picker
- **Submit:** "Send Message" — forest green gradient fill, soft hover glow
- **Success state:** Form replaced with confirmation: "Thank you. We'll be in touch within 24 hours."
- **Error state:** Subtle red inline validation per field, non-aggressive
- **Input styling:** Warm borders (`#E8E4DE`), focus ring in forest green, generous padding, `rounded-lg`

### Contact Details (below form)
- Three columns (desktop), stacked (mobile):
  - **Address:** 605 74th St SW, Everett, WA 98203
  - **Phone:** (206) 504-0037 | (206) 313-1516
  - **Email:** abeba@flowerafh.com
- **Hours:** "Available 24/7 for inquiries | Tours by appointment"

### Google Maps Embed
- Full-width, ~400px height
- Centered on 605 74th St SW, Everett, WA 98203
- Styled with warm/grayscale tint if possible

### Closing Line
- Centered on warm background
- "Every call, every visit, every question — handled with care." — Playfair Display, italic

---

## Responsive Behavior

- **Desktop (1280px+):** Full layouts as described — split screens, multi-column grids, generous spacing
- **Tablet (768–1279px):** Gallery drops to 2 columns, service cards stack to single column at lower end, split layouts adjust proportions
- **Mobile (<768px):** Single column throughout, hamburger nav, lightbox uses swipe, hero text scales down, form stacks full-width

---

## Performance Considerations

- All images served via Next.js `<Image>` with automatic WebP/AVIF conversion on Vercel
- Lazy loading on all images below the fold
- Hero images eager-loaded (priority)
- `will-change: transform, opacity` on scroll-animated elements
- Framer Motion animations use GPU-accelerated properties only (transform, opacity)
- Preload next-beat images in scrollytelling sequence
- Font display: `swap` for both Playfair Display and Inter

---

## Image Sources

All ~30 photos from the provided imgbb collection. These will be downloaded, renamed descriptively (e.g., `bedroom-01.webp`, `bathroom-main.webp`, `dining-table.webp`), and organized into `/public/images/` subdirectories by category.

Photo URLs for download:
- https://i.ibb.co/Kc8t7jX9/0ddbadba006a773a415a16a2d814da35-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/SXHNtVbj/1-1.webp
- https://i.ibb.co/Jw886v9n/1.webp
- https://i.ibb.co/s969MGyd/1c3c84141a33e0cced2283b645658d87-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/cKMgrBgP/3ef7a64d0ed08504da4b3024d11ed8c0-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/DDPqq0SP/7afa51fe0c3e318f09fe6b0cb799ca04-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/prndgr1y/7c6e8e85eebffa55d2bdcdbae9877f05-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/JwyWYTrd/7eba510eb53b95c3539a3274b10a1e87-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/VcB2C1j6/9c4c1db4ce6c4159633f27fd9259a39e-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/7xwZXtZ7/9ee9b50d5a03c530707b40ae10e1e5fd-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/j95N77wd/25ff525ad894d80b71ac19f0f87ebf1a-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/5XXcZ9GQ/36d354edd8bc5454dec3c721f38065be-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/nMX1kJnX/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0019-2-740x493.jpg
- https://i.ibb.co/0RYPdtLb/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bathroom-IMGL0022-2.jpg
- https://i.ibb.co/C5MCKdKZ/180-2nd-Ave-S-Edmonds-WA-98020-USA-Bedroom-IMGL0025-2-2000x1333.jpg
- https://i.ibb.co/F4qtN9vR/180-2nd-Ave-S-Edmonds-WA-98020-USA-Dining-room-IMGL0019-2000x1333.jpg
- https://i.ibb.co/6JVy48L6/0664c71c16af7db24b96ead62f983742-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/rKSNFgxs/9980a06e3da7384cfb7990154b6e0fff-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/R4zqt1Qv/35148c286add27d447b3f47de8d63e36-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/7N6MRysd/229071-tiny.jpg
- https://i.ibb.co/FqkykfVp/a75018ea2db14ad6a04df57fc1851daa-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/kVWkpWMy/bb05900f6d09d9a45e229bb4b123d884-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/gM9X7wp4/Blog-Company-News.png
- https://i.ibb.co/4ZWVCtKm/c0ac88a48a0d4319319a25fc8be9071d-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/8D5hV51C/c009d933140daa0498fb9471134fe02a-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/N2tWbqTf/cb81fd5c76159a7fc851ff00d4cb799f-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/VcqdHKDB/dea4a7f20233bfa440ac8ed343980426-uncropped-scaled-within-1344-1008.webp
- https://i.ibb.co/4wq736YX/engaging-games-for-seniors-1080x675.jpg
- https://i.ibb.co/hRFN7nY1/gettyimages-1633393933-640x640.jpg
- https://i.ibb.co/fd8tXxvH/istockphoto-638886566-612x612.jpg
- https://i.ibb.co/XZtxZGTj/istockphoto-2163703602-612x612.jpg
