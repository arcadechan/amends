const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#1A1D27',
      lightBlack: '#2d313e',
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
      candy: ['var(--font-candy)', ...fontFamily.sans],
      inter: ['var(--font-inter)', ...fontFamily.sans]
    },
    extend: {
      typography: ({ theme }) => ({
        light: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.black'),
            '--tw-prose-links': theme('colors.blue'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.black'),
            '--tw-prose-hr': theme('colors.black'),
            '--tw-prose-quotes': theme('colors.black'),
            '--tw-prose-quote-borders': theme('colors.black'),
            '--tw-prose-captions': theme('colors.black'),
            '--tw-prose-code': theme('colors.black'),
            '--tw-prose-pre-code': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.black'),
            '--tw-prose-th-borders': theme('colors.black'),
            '--tw-prose-td-borders': theme('colors.black')
          }
        },
        dark: {
          css: {
            '--tw-prose-body': theme('colors.lace'),
            '--tw-prose-headings': theme('colors.yellow'),
            '--tw-prose-lead': theme('colors.yellow'),
            '--tw-prose-links': theme('colors.yellow'),
            '--tw-prose-bold': theme('colors.lace'),
            '--tw-prose-counters': theme('colors.lace'),
            '--tw-prose-bullets': theme('colors.lace'),
            '--tw-prose-hr': theme('colors.yellow'),
            '--tw-prose-quotes': theme('colors.lace'),
            '--tw-prose-quote-borders': theme('colors.yellow'),
            '--tw-prose-captions': theme('colors.lace'),
            '--tw-prose-code': theme('colors.yellow'),
            '--tw-prose-pre-code': theme('colors.yellow'),
            '--tw-prose-pre-bg': theme('colors.lace'),
            '--tw-prose-th-borders': theme('colors.lace'),
            '--tw-prose-td-borders': theme('colors.lace')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
