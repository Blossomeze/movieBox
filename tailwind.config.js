/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#24252d',
      graytext: '#6B7280',
      white: '#ffffff',
      button: '#BE123C'
    },
    extend: {},
  },
  plugins: [],
}