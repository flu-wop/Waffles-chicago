import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EF",
        butter: "#FDEFD9",
        syrup: "#E8923A",
        brown: "#4D2B24",
        "brown-light": "#7A4B3E",
        cocoa: "#241210",
        orange: "#FA7D23",
        "orange-light": "#FFA45C",
        "orange-deep": "#D9620F",
      },
      fontFamily: {
        sans: ['"Readex Pro Variable"', "system-ui", "sans-serif"],
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
      },
      boxShadow: {
        lift: "0 24px 48px -16px rgba(77,43,36,0.28)",
        soft: "0 10px 30px -12px rgba(77,43,36,0.22)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        bob: "bob 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
