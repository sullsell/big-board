import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        field: "#14261E",      // chalkboard/turf green — page background
        "field-line": "#1B3327", // slightly raised surface (cards, rows)
        chalk: "#F4F0E4",       // chalk white — primary text
        "chalk-dim": "#9FA89C", // dim chalk — secondary text
        hash: "#D8482B",        // end-zone orange — accent, reach flag
        gold: "#C9A227",        // trophy gold — value flag
        line: "rgba(244,240,228,0.14)",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
