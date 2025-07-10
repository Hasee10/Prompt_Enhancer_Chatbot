module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#234034', // richer, more vibrant
        'olive': '#4a5d4a',      // brighter, fresher
        'cream': '#f6f8f7',      // cooler, cleaner
        'peach': '#ffd7b3',      // softer, more radiant
        'mint': '#d2f5e3',       // brighter, more minty
        'soft-orange': '#ffe9cc',// warmer, more lively
        'pastel-green': '#b8e6c1', // fresher, more pastel
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(135deg, #234034 80%, #b8e6c1 100%)',
        'context-gradient': 'linear-gradient(135deg, #d2f5e3 80%, #ffd7b3 100%)',
      },
    },
  },
  plugins: [],
} 