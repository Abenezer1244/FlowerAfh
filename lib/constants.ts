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
  { src: "/images/bedrooms/bedroom-01.jpg", alt: "Spacious private bedroom with natural light", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-02.jpg", alt: "Comfortable bedroom with warm decor", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-03.jpg", alt: "Cozy bedroom with accessibility features", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-04.jpg", alt: "Well-appointed guest bedroom", category: "bedrooms" },
  { src: "/images/bedrooms/bedroom-05.jpg", alt: "Bright bedroom with garden view", category: "bedrooms" },
  { src: "/images/bathrooms/bathroom-01.jpg", alt: "Clean, accessible bathroom with safety features", category: "bathrooms" },
  { src: "/images/bathrooms/bathroom-02.jpg", alt: "Spa-inspired bathroom with warm fixtures", category: "bathrooms" },
  { src: "/images/bathrooms/bathroom-03.jpg", alt: "Modern bathroom with grab bars", category: "bathrooms" },
  { src: "/images/dining/dining-01.jpg", alt: "Elegant dining table set for a family meal", category: "dining" },
  { src: "/images/dining/dining-02.jpg", alt: "Warm dining area with natural light", category: "dining" },
  { src: "/images/living/living-01.jpg", alt: "Spacious living room with comfortable seating", category: "living" },
  { src: "/images/living/living-02.jpg", alt: "Bright common area for relaxation", category: "living" },
  { src: "/images/living/living-03.jpg", alt: "Welcoming entryway and sitting area", category: "living" },
  { src: "/images/living/living-04.jpg", alt: "Cozy fireplace lounge", category: "living" },
  { src: "/images/living/living-05.jpg", alt: "Sunlit reading nook", category: "living" },
  { src: "/images/community/activities-01.jpg", alt: "Residents enjoying social activities", category: "community" },
  { src: "/images/community/games-01.jpg", alt: "Seniors playing engaging games together", category: "community" },
  { src: "/images/community/caregiver-01.jpg", alt: "Caregiver sharing a warm moment with resident", category: "community" },
  { src: "/images/community/caregiver-02.jpg", alt: "Compassionate one-on-one care", category: "community" },
  { src: "/images/community/caregiver-03.jpg", alt: "Team member assisting with daily activities", category: "community" },
  { src: "/images/community/group-01.jpg", alt: "Group dining moment", category: "community" },
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
