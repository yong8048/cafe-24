import { blob } from "stream/consumers";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        main_section: "calc(100vh - 78px)",
      },
      colors: {
        mainColor: "#5A2CDA",
      },
      animation: {
        cloud: "cloud 2s ease-in-out infinite",
        icon: "icon 0.3s ease-in-out forwards",
        subtitle: "fontweight 2s ease-in-out forwards",
      },
      keyframes: {
        cloud: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3%)" },
        },
        icon: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
        fontweight: {
          "0%, 100%": { "font-weight": "normal", color: "gray" },
          "50%": { "font-weight": "bold", color: "black" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
