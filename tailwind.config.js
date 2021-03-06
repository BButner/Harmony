module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        spotify: {
          '100': '#76d598',
          '200': '#5fce86',
          '300': '#4cc877',
          '400': '#35c065',
          '500': '#1db954',
          '600': '#1aa84c',
          '700': '#179644',
          '800': '#14803a',
          '900': '#116e32',
          '1000': '#0f5c2a'
        },
        youtube: {
          '100': '#ff7a7a',
          '200': '#ff5c5c',
          '300': '#ff3d3d',
          '400': '#ff1f1f',
          '500': '#ff0000',
          '600': '#e00000',
          '700': '#c20000',
          '800': '#a30000',
          '900': '#850000',
          '1000': '#660000'
        },
        apple: {
          '100': '#fc7d8c',
          '200': '#fc6476',
          '300': '#fc4f63',
          '400': '#fb374e',
          '500': '#fb233c',
          '600': '#e22238',
          '700': '#ca1c30',
          '800': '#ae192a',
          '900': '#991524',
          '1000': '#7d121e'
        },
        pandora: {
          '100': '#66c5f5',
          '200': '#4dbdf5',
          '300': '#35b4f3',
          '400': '#18a9f2',
          '500': '#00a0f0',
          '600': '#008fd6',
          '700': '#0081c2',
          '800': '#0070a8',
          '900': '#005f8f',
          '1000': '#00527a'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
