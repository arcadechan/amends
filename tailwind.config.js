const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      black: '#1a1d27',
      yellow: '#ffdc8b',
      white: '#faf4eb',
      red: '#e06363',
      blue: '#77bfe8',
      green: '#63c67e'
    },
    fontFamily: {
      'candy': ['var(--font-candy)', ...fontFamily.sans],
      'inter': ['var(--font-inter)', ...fontFamily.sans]
    }
  },
  plugins: [],
}