const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./components//*.{js,ts,jsx,tsx}', './pages//*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          '100': 'var(--main-100)',
          '200': 'var(--main-200)',
          '300': 'var(--main-300)',
          '400': 'var(--main-400)',
          '500': 'var(--main-500)'
        },
        spotify: {
          '100': 'hsl(141, 53%, 65%)',
          '200': 'hsl(141, 53%, 59%)',
          '300': 'hsl(141, 53%, 54%)',
          '400': 'hsl(141, 57%, 48%)',
          '500': 'hsl(141, 73%, 42%)',
          '600': 'hsl(141, 73%, 38%)',
          '700': 'hsl(141, 73%, 34%)',
          '800': 'hsl(141, 73%, 29%)',
          '900': 'hsl(141, 73%, 25%)',
          '1000': 'hsl(141, 72%, 21%)'
        },
        youtube: {
          '100': 'hsl(0, 87%, 75%)',
          '200': 'hsl(0, 87%, 75%)',
          '300': 'hsl(0, 87%, 75%)',
          '400': 'hsl(0, 87%, 75%)',
          '500': 'hsl(0, 100%, 50%)',
          '600': 'hsl(0, 87%, 75%)',
          '700': 'hsl(0, 87%, 75%)',
          '800': 'hsl(0, 87%, 75%)',
          '900': 'hsl(0, 87%, 75%)',
          '1000': 'hsl(0, 87%, 75%)'
        },
        apple: {
          '100': 'hsl(353, 96%, 74%)',
          '500': 'hsl(353, 96%, 56%)'
        },
        pandora: {
          '100': 'hsl(200, 88%, 68%)',
          '500': 'hsl(200, 100%, 47%)'
        },
        color: {
          'main': 'var(--text-color)',
          'alt': 'var(--text-color-alt)',
          'alt-opp': 'var(--text-color-opposite)'
        },
        cyan: colors.cyan
      }
    },
  },
  transitionDuration: {
    '250': '250ms'
  },
  variants: {},
  plugins: [],
}
