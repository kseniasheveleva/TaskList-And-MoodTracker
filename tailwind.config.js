/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,hbs}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
}

