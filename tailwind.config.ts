import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#090909',
        blood: '#8B0000',
        ember: '#B11226',
        flare: '#D62828',
        bone: '#F5F5F5',
        ash: '#B3B3B3',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        redline: '0 0 60px rgba(177, 18, 38, 0.22)',
      },
      keyframes: {
        scrollPulse: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(18px)', opacity: '1' },
        },
        roleSlide: {
          '0%, 18%': { transform: 'translateY(0)' },
          '25%, 43%': { transform: 'translateY(-25%)' },
          '50%, 68%': { transform: 'translateY(-50%)' },
          '75%, 93%': { transform: 'translateY(-75%)' },
          '100%': { transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(-2%, -1%, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, 1%, 0) scale(1.05)' },
        },
      },
      animation: {
        scrollPulse: 'scrollPulse 1.6s ease-in-out infinite',
        roleSlide: 'roleSlide 8s cubic-bezier(.77,0,.18,1) infinite',
        drift: 'drift 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
