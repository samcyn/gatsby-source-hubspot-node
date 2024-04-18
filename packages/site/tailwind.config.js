/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`, `./src/docs/*.mdx`],
  theme: {
    extend: {
      spacing: {
        13: '56px',
        19: '76px',
        25: '100px',
        30: '120px',
        50: '200px',
        100: '400px',
      },
      colors: {
        primary: '#8a4baf',
        secondary: '#ececec',
        complimentary: '#eef0f8',
        dark: '#232129',
        'brand-gray': '#F3F6F9',
        'brand-dgray': '#ebedf3',
        'gray-60': '#635e69',
        'gray-80': '#36313d',
        'gray-5': '#fbfbfb',
        'gray-30': '#d9d7e0',
        'gray-1': '#f0f0f2',
        'orange-50': '#fdfaf6',
        'orange-30': '#faede5',
        'orange-40': '#866c5b',
        'purple-20': '#d9bae8',
        'black-code': '#0e0b0b',
      },
    },
  },
  plugins: [],
};
