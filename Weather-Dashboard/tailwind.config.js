/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "wrapper": "#767BA8",
        "main": "#000409",
        "secondary": "#1D2936"
      },
      colors: {
        "primary": "#edf6f9",
        "green": {
          "dark": "#2a9d8f",
          "med": "#20F9BF",
          "light": "#74c69d"
        },
        "night": {
          "red": "#ef233c",
          "salmon": "#fe6d73",
          "orange": "#ff7b00",
          "sunset": {
            "1": "#6d597a",
            "2": "#b56576",
            "3": "#e56b6f"
          },
        },
        "blue": {
          "dark": "#5465ff",
          "med": "#788bff",
          "light": "#9bb1ff"
        },
        "black": "#000409",
        "uvi": {
          "low": "#06d6a0",
          "moderate": "#ffee32",
          "high": "#ff5400",
          "very-high": "#ef233c",
          "extreme": "#a50104"
        }
      },
      fontFamily: {
        "mw": ["Merriweather", "sans-serif"],
        "rs": ["Roboto Slab", "sans-serif"],
        "rw": ["Raleway", "sans-serif"]
      }
    },
  },
  plugins: [],
}

