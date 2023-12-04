/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{ts,tsx}'],
 theme: {
  extend: {
   backgroundImage: {
    primaryGradient: 'linear-gradient(90deg, #D47FB1 0%, #A273CF 100%)',
    whiteGradient: 'linear-gradient(0deg, #e8e8e8 0%, #FFF 100%)',
   },
   fontFamily: {
    custom: ['AvenirNext', 'sans-serif'],
   },
   keyframes: {
    'slide-left': {
     '0%': { transform: 'translateX(0)' },
     '100%': { transform: 'translateX(-100%)' },
    },
   },
  },
 },
 plugins: [],
}
