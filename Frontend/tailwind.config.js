const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    colors: {
      cream: "#FEFFDE",
      green: {
        100: "#DDFFBC",
        200: "#91C788",
        300: "#52734D",
      },
    },
    screens: {
      xs: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      sm: { min: "640px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
