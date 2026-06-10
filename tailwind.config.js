/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5EDD6',
        'green-dark': '#1B4D2E',
        'green-mid': '#2D6A4F',
        gold: '#C9A227',
        'gold-light': '#F0C84A',
        'cream-border': '#D4C5A0',
      },
      fontFamily: {
        display: ['"Oswald"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
