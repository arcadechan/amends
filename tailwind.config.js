const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      black: '#1a1d27',
      yellow: '#ffdc8b',
      white: '#faf4eb',
      red: '#D23232',
      blue: '#1D76AA',
      green: '#2D7B42'
    },
    fontFamily: {
      'candy': ['var(--font-candy)', ...fontFamily.sans],
      'inter': ['var(--font-inter)', ...fontFamily.sans]
    }
  },
  plugins: [],
}