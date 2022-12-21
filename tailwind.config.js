/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxl: { max: "1440px" },

      xl: { max: "1279px" },

      lg: { max: "1024px" },

      mdd: { max: "870px" },

      md: { max: "768px" },

      sm: { max: "639px" },
      xs: { max: "426px" },
      xss: { max: "376px" },
    },
    extend: {
      zIndex: {
        100: "100",
      },
      backgroundImage: {
        "hero-pattern": "url('/puma.webp')",
      },
      spacing: {
        mySpacing: "50% - 50px",
      },
      keyframes: {
        rotateLoader: {
          "0%": {
            opacity: 0.5,
            transform: "rotate(0deg)",
          },
          "100%": {
            opacity: 1,
            transform: "rotate(1turn)",
          },
        },
      },
      animation: {
        rotateLoader: "rotateLoader 2.5s infinite",
      },
      gridTemplateColumns: {
        2.2: "repeat(2, minmax(0, 0.25fr))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
      addVariant("not-first", "&:not(:first-child)");
    }),
  ],
};
