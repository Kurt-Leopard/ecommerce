const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-black": "#323232",
        "dim-black": "#282828",
      },
      fontFamily: {
        lato: ["lato", ...defaultTheme.fontFamily.sans],
      },
    },
    // screens: {
    //   "1xs": "380px",
    //   "2xs": "426px",
    //   xs: "480px",
    //   sm: "640px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1200px",
    //   "2xl": "1440px",
    //   "3xl": "1600px",
    // },
  },
};
