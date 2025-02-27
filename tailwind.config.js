/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primaryRed: "#DC3644",
        black1: "#FEFEFE",
        black2: "#F2F2F2",
        black3: "#E8E8E8",
        black4: "#979797",
        black5: "#707070",
        black6: "#525252",
        black7: "#2A2A2A",
        black8: "#202020",
        black9: "#1A1A1A",
        black10: "#000000"
      }
    },
  },
  plugins: [],
}

