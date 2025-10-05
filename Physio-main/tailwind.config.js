/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./client/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        deepTeal: '#066A67',
        darkTeal: '#024644',
        cadetTeal: '#457B79',
        lightTeal: '#90C1BE',
        paleTeal: '#C2E1DF',
      },
      gradientColorStops: {
        tealGradient: {
          from: '#024644',
          via: '#066A67',
          to: '#457B79',
        },
        lightTealGradient: {
          from: '#90C1BE',
          via: '#C2E1DF',
          to: '#457B79',
        },
      },
    },
  },
  plugins: [],
};

