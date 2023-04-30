const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: '#1A1D27',
      yellow: '#FFDC8B',
      white: '#FFFFFF',
      lace: '#FAF4EB',
      red: '#D23232',
      blue: '#1D76AA',
      green: '#2D7B42',
      gray: '#808080',
      transparent: 'transparent'
    },
    fontFamily: {
      'candy': ['var(--font-candy)', ...fontFamily.sans],
      'inter': ['var(--font-inter)', ...fontFamily.sans]
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}