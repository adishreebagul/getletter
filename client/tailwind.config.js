import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f0ead6',   // page background
        cream: '#f5f1e6',       // card background
        brown: '#4b3621',       // text
        wax: '#7e3a15',         // button / accent
        darkWax: '#6b0a0a',     // darker accent
        placeholder: '#7d6a58', // placeholder text
      },
      fontFamily: {
        serifVintage: ['"EB Garamond"', 'serif'],
        cursiveVintage: ['"Dancing Script"', 'cursive'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
})
