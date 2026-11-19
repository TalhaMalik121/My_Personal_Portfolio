/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#111113",
        elevated: "#17171a",
        line: "rgba(255,255,255,0.08)",
        ink: "#ededef",
        muted: "#8b8b93",
        faint: "#55555c",
        accent: "#9db4ff",
      },
      fontFamily: {
        sans: ['"Geist Variable"', "Inter", "system-ui", "sans-serif"],
        heading: ['"Geist Variable"', "Inter", "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.055em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
        quart: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      animation: {
        "scroll-dot": "scroll-dot 2.2s cubic-bezier(0.76,0,0.24,1) infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
      keyframes: {
        "scroll-dot": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};
