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
      fontFamily: {
        content: ["Roboto mono"]
      },
      animation: {
        'bounce-slow': 'bounce 1.5s ease-in infinite',
      },
      screens: {
        'sm': {'max': '767px'},
      },
      colors: {
        'darkMainWrapperFrom': '#0c2159',
        'darkMainWrapperVia': '#050f26',
        'darkMainWrapperTo': '#0d2157',
        'darkText': '#e8e8e8',
        'darkBg': '#101a30',
        'darkBgActive': '#15213d',
        'darkBorder': '#334155',
        'lightMainWrapperFrom': '#c7e0ff',
        'lightMainWrapperVia': '#e3efff',
        'lightMainWrapperTo': '#d7e7fc',
        'lightText': '#000826',
        'lightBg': '#eff6ff',
        'lightBgActive': '#e0efff',
        'lightBorder': '#b4cef0',
        'accentColor': '#fbbf24',
        'accentColor2': '#2bb1ff',
        'darkScrollBar': 'color-scheme: dark'
      },
      fontSize: {
        'xxxxxs': '0.35rem',
        'xxxxs': '0.45rem',
        'xxxs': '0.55rem',
        'xxs': '0.7rem',
      }
    }
  },
  plugins: [],
}

