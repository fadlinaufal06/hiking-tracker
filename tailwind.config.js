/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      styles: {
        '.separator': {
          borderTopWidth: '1px',
          borderTopColor: '#ccc',
        },
      },
    },
  },
  plugins: [],
}