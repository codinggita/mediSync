/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2A7FFF',
        secondary: '#2ECC71',
        background: '#F8FAFC',
        text: '#1F2937',
        accentBlue: '#E6F0FF',
        accentGreen: '#E8F8F5',
        warning: '#F59E0B',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        slideUp: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        floatBadge: 'floatBadge 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
