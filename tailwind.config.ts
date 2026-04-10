import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#7c3aed", 50: "#f5f3ff", 100: "#ede9fe", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 900: "#4c1d95" },
        secondary: { DEFAULT: "#2563eb", 500: "#3b82f6", 600: "#2563eb" },
        accent: { DEFAULT: "#f59e0b", 400: "#fbbf24", 500: "#f59e0b" },
        gaming: { dark: "#0a0a0f", card: "#12121f", border: "#1e1e3f", glow: "#7c3aed" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fire-glow": "fireGlow 2s ease-in-out infinite",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glitch": "glitch 1s infinite",
        "shimmer": "shimmer 2s infinite",
        "bounce-in": "bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
        "slide-up": "slideUp 0.4s ease-out",
        "rainbow": "rainbow 3s linear infinite",
      },
      keyframes: {
        fireGlow: {
          "0%, 100%": { textShadow: "0 0 10px #ff4500, 0 0 20px #ff4500, 0 0 40px #ff6a00" },
          "50%": { textShadow: "0 0 20px #ff6a00, 0 0 40px #ff6a00, 0 0 80px #ffaa00" },
        },
        neonPulse: {
          "0%, 100%": { textShadow: "0 0 5px #7c3aed, 0 0 10px #7c3aed, 0 0 20px #7c3aed" },
          "50%": { textShadow: "0 0 10px #a855f7, 0 0 25px #a855f7, 0 0 50px #a855f7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glitch: {
          "0%, 100%": { clipPath: "inset(0)", transform: "translate(0)" },
          "20%": { clipPath: "inset(20% 0 60% 0)", transform: "translate(-4px, 2px)" },
          "40%": { clipPath: "inset(60% 0 20% 0)", transform: "translate(4px, -2px)" },
          "60%": { clipPath: "inset(40% 0 40% 0)", transform: "translate(-2px, 0)" },
          "80%": { clipPath: "inset(10% 0 80% 0)", transform: "translate(2px, 1px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;