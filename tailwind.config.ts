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
