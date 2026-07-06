import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Keep dark mode enabled
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "neon-green": "#39FF14",
        "neon-purple": "#B026FF",
        "neon-blue": "#00F0FF",
        "dark-bg": "#0A0A0A",
        "dark-surface": "#121212",
        "dark-surface-alt": "#1A1A1A",
        tenant: "var(--tenant-accent, #39FF14)", // Default to neon green
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(57, 255, 20, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
