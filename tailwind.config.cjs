/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        panel: "8px 8px 0 0 #0f172a",
      },
      fontFamily: {
        sans: ['"Trebuchet MS"', '"Gill Sans"', "sans-serif"],
        display: ['"Arial Black"', '"Impact"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
