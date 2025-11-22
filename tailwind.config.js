/******** Tailwind Config ********/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#effdf5',
          100: '#defbe7',
          200: '#bcf7cf',
          300: '#8eecb6',
          400: '#5dd38f',
          500: '#34c471',
          600: '#22a85c',
          700: '#1b874b',
          800: '#176b3d',
          900: '#124f2e',
        }
      }
    },
  },
  plugins: [],
}
