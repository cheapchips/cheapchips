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
    extend: {
      accentColorGlow: {
        'sm': 'box-shadow: 0 4px 6px -1px rgb(255 255 255 / 0.1), 0 2px 4px -2px rgb(255 255 255 / 0.1)'
      }
    },
  },
  plugins: [],
}

