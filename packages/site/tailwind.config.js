/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      spacing: {
        13: '56px',
        25: '100px',
        30: '120px',
        50: '200px',
        100: '400px',
      },
      colors: {
        primary: '#3F4254',
        secondary: '#ececec',
        complimentary: '#eef0f8',
        'brand-gray': '#F3F6F9',
        'brand-dgray': '#ebedf3',
      },
    },
  },
  plugins: [],
};
