/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563EB",
          secondary: "#4F46E5",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
}
