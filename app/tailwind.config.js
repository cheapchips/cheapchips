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
      'textShadow': "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    },
  },
  plugins: [],
}

