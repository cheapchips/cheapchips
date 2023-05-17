/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/logical/*.{tsx}",
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
        'darkBgActive': '#15213d',
        'darkBorder': '#334155',
        'lightMainWrapperFrom': '#c4daf5',
        'lightMainWrapperVia': '#bcd5f7',
        'lightMainWrapperTo': '#bcd6f5',
        'lightText': '#000826',
        'lightBg': '#eff6ff',
        'lightBgActive': '#deecfc',
        'lightBorder': '#b4cef0',
        'accentColor': '#fbbf24'
      },
      fontSize: {
        'xxs': '0.7rem'
      }
    }
  },
  plugins: [],
}

