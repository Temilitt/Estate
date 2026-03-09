/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: '#0C1F0E',
          900: '#143217',
          800: '#1C4A20',
          700: '#245E28',
          600: '#2D7A33',
          500: '#3A9E42',
        },
        cream: {
          50:  '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4EDD8',
          300: '#EDE0C0',
        },
        sand: {
          100: '#F0E8D5',
          200: '#E3D4B0',
          300: '#C8B98A',
          400: '#A89260',
          500: '#8A7244',
        },
        earth: '#3D2B1F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}