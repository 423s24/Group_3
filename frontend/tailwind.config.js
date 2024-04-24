/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue"
  ],
  theme: {
    extend: {
      colors: {
        "hrdc-teal": "#0F7178",
        "hrdc-orange": "#F6B747",
        "hrdc-blue": "#003E52",
        "hrdc-green": "#A1A750",
        "hrdc-red": "#FF0000",
      }
    },

  },
  plugins: [],
}

