import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#5C1A1B",
        "maroon-soft": "#7A2426",
        beige: "#F4EDE4",
        cream: "#FFFAF2",
        sand: "#E8DCC8",
        ink: "#1D1111",
        muted: "#766B63",
      },
      fontFamily: {
        sans: [
          "Neue Haas Grotesk Text",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Neue Haas Grotesk Display",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
