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
      width: {
        without_sidebar: "calc(100% - 435px)",
      },
      height: {
        main_section_sm: "calc(100vh - 78px)",
        main_section: "calc(100vh - 44px)",
      },
      colors: {
        mainColor: "#5A2CDA",
      },
      animation: {
        cloud: "cloud 2s ease-in-out infinite",
        icon: "icon 0.3s ease-in-out forwards",
        subtitle: "fontweight 2s ease-in-out forwards",
      },
      boxShadow: {
        closebutton: "rgba(0, 0, 0, 0.2) 0px 3px 7px 0px",
        currentLocation: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px",
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
          "0%, 100%": { fontweight: "normal", color: "gray" },
          "50%": { fontweight: "bold", color: "black" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
