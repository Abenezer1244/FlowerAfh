import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
