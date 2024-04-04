/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      spacing: {
        25: '100px',
        100: '400px',
      },
    },
  },
  plugins: [],
};
