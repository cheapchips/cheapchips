/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    linearGradients: ['hover', 'responsive'],
    radialGradients: ['hover', 'responsive'],
    conicGradients: ['hover', 'responsive'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

