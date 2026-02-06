/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Source Serif 4"', 'serif'],
        greek: ['"Noto Serif"', 'serif']
      }
    }
  },
  plugins: []
};
