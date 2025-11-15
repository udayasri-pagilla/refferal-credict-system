module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 500ms ease-out both',
        lift: 'lift 160ms ease-out both',
      },
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          600: '#4f46e5',
          700: '#4338ca'
        }
      }
    },
  },
  plugins: [],
}
