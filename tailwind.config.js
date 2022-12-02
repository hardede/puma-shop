/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
      addVariant("not-first", "&:not(:first-child)");
    }),
  ],
};
