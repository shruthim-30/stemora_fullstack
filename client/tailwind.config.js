/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D2136',
        teal: {
          DEFAULT: '#1FAFA9',
          dark: '#0F7F7B',
        },
        gold: '#F2AA1F',
        paper: '#F7FAFB',
        grid: '#DCE8EB',
        mut: '#4d6275',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '4px 4px 0 #0D2136',
        'brutal': '6px 6px 0 #0D2136',
        'brutal-lg': '8px 8px 0 #0D2136',
        'brutal-teal': '8px 8px 0 #1FAFA9',
      },
      borderWidth: {
        '2.5': '2.5px',
        '3': '3px',
      }
    },
  },
  plugins: [],
}
