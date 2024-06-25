/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'grey': {
          '100': '#FAFAFA',
          '200': '#EAEAEA',
          '300': '#E0E0E0',
          '400': '#BDBDBD',
          '500': '#9E9E9E',
        },
        'orange': {
          '50': '#FBE1D6',
          '500': '#FB4F14',
          '600': '#ee480d',
        },
        'raspberry': {
          '50': '#F3DEE5',
          '500': '#AA2351',
        },
        'lemon': {
          '50': '#F4EEC7',
          '500': '#C0AD38',
        },
      },
      boxShadow: {
        'light': '0 3px 5px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}



