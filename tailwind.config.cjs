/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
    darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#10B981"
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"]
      }
    }
  },
  plugins: []
}
