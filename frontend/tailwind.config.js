/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F3F2FF',
          200: '#E2E0FF',
          300: '#D5D1FF',
          400: '#D1CDFF',
          500: '#b6b0ef',
        },
        contrast: {
          100: '#E2E0EE',
          200: '#E2E0FF',
          300: '#D5D1FF',
          400: '#D1CDFF',
          500: '#a09ae1',
        },
        secondary: {
          100: '#FAFCD2',
          200: '#F0F78D',
          300: '#E9F456',
          400: '#D9E72D',
          500: '#B9C611',
        },
        grey: {
          100: '#F4F4F4',
          300: '#616161',
          500: '#25262F',
        },
        orange: {
          50: '#FBE1D6',
          500: '#FB4F14',
          600: '#ee480d',
        },
        raspberry: {
          50: '#F3DEE5',
          500: '#AA2351',
        },
        lemon: {
          50: '#F4EEC7',
          500: '#C0AD38',
        },
      },
      boxShadow: {
        light: '0 3px 5px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
