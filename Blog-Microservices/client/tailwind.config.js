/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        "main": "#CBD2D8",
        "submit": "#388661",
        "purple": "#9b5de5",
        "alt": "#161a1d"
      },
      backgroundColor: {
        "primary": "#161a1d",
        "secondary": "#242B30",
        "submit": "#52b788",
      },
      border: {
      }
    },
  },
  plugins: [],
}

