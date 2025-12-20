/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // ✅ Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverseSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },

      // ✅ Animation utilities
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        scaleUp: 'scaleUp 0.6s ease-out forwards',
        'spin-slow': 'spinSlow 100s linear infinite',
        'spin-reverse-slow': 'spinReverseSlow 100s linear infinite',
      },
    },
  },

  // ✅ Custom plugin for animation delays
  plugins: [
    function ({ addUtilities }) {
      const delays = {
        '.delay-200': { 'animation-delay': '200ms' },
        '.delay-500': { 'animation-delay': '500ms' },
        '.delay-1000': { 'animation-delay': '1000ms' },
      }
      addUtilities(delays)
    },
  ],
}
