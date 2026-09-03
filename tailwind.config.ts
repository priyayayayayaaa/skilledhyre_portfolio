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
        background: "#08090E",
        surface: {
          DEFAULT: "#0F111A",
          hover: "#171A27",
          border: "rgba(255, 255, 255, 0.08)",
        },
        cyan: {
          glow: "#00F2FE",
          soft: "#4FACFE",
        },
        violet: {
          glow: "#8A2BE2",
          soft: "#B388FF",
        },
        brand: {
          dark: "#08090E",
          card: "#0F111B",
          accent: "#00E5FF",
          purple: "#7C3AED",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyan-violet-glow": "linear-gradient(135deg, #00F2FE 0%, #7C3AED 100%)",
        "glass-gradient": "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
