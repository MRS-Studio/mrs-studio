/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8C547',
          dark: '#A07D10',
          pale: '#F0DFA0',
        },
        brown: {
          DEFAULT: '#4E342E',
          light: '#6D4C41',
          dark: '#3E2723',
          mid: '#795548',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          dark: '#F5E6D3',
          mid: '#EDD9BB',
        },
        beige: '#F5E6D3',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jost)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E8C547 50%, #A07D10 100%)',
        'brown-gradient': 'linear-gradient(135deg, #3E2723 0%, #4E342E 50%, #6D4C41 100%)',
        'luxury-gradient': 'linear-gradient(180deg, #3E2723 0%, #4E342E 60%, #5D4037 100%)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(201, 162, 39, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.7)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 162, 39, 0.3)',
        'gold-lg': '0 8px 40px rgba(201, 162, 39, 0.5)',
        'luxury': '0 10px 40px rgba(62, 39, 35, 0.3)',
        'card': '0 2px 15px rgba(62, 39, 35, 0.12)',
        'card-hover': '0 8px 30px rgba(62, 39, 35, 0.25)',
      },
    },
  },
  plugins: [],
};
