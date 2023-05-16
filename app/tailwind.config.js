/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'darkMainWrapperFrom': '#0c2159',
        'darkMainWrapperVia': '#050f26',
        'darkMainWrapperTo': '#0d2157',
        'darkText': '#e8e8e8',
        'darkBg': '#0f172a',
        'darkBorder': '#334155',
        'lightMainWrapperFrom': '#c4daf5',
        'lightMainWrapperVia': '#bcd5f7',
        'lightMainWrapperTo': '#bcd6f5',
        'lightText': '#000826',
        'lightBg': '#eff6ff',
        'lightBorder': '#b4cef0'
      },
      spacing: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      }
    }
  },
  plugins: [],
}

