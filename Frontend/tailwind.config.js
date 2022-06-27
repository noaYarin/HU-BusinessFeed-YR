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

    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
