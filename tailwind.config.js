/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        miffy: {
          red: '#EA3026',
          blue: '#0067A5',
          yellow: '#FDC600',
          green: '#008246',
          white: '#FFFFFF',
          black: '#000000',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
