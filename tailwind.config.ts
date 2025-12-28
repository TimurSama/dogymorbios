import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        'bg-light': '#FFFFFF',
        'surface-light': '#FAF8F5',
        'surface2-light': '#F0ECE7',
        'text-primary-light': '#1C1A19',
        'text-secondary-light': '#58524D',
        'line-light': '#D9D3CC',
        'outline-light': '#B8AEA5',
        
        // Dark theme
        'bg-dark': '#2C2B29',
        'surface-dark': '#1F1E1C',
        'surface2-dark': '#3A3634',
        'text-primary-dark': '#F5F4F2',
        'text-secondary-dark': '#CFCAC5',
        'line-dark': '#4A4542',
        'outline-dark': '#665E58',
        
        // Accents - пастельные тона
        'sky': '#AFCBFF',
        'honey': '#E8DCA8',
        'burgundy': '#A95056',
        'chocolate': '#6B4B3E',
        'success': '#86C8BC',
        'warning': '#E1A177',
        'danger': '#E57C73',
        'info': '#7FA7D9',
        // Дополнительные пастельные акценты
        'pastel-pink': '#FFB3BA',
        'pastel-lavender': '#BAE1FF',
        'pastel-mint': '#BAFFC9',
        'pastel-peach': '#FFDFBA',
        'pastel-lilac': '#E6D5FF',
        'pastel-rose': '#FFD1DC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '16px' }],
        'body': ['14px', { lineHeight: '20px' }],
        'label': ['16px', { lineHeight: '24px' }],
        'title': ['20px', { lineHeight: '28px' }],
        'display': ['28px', { lineHeight: '36px' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        'touch': '44px', // Минимальный размер touch-зоны
      },
      boxShadow: {
        'elev0': '0 0 0 1px var(--outline)',
        'elev1': '0 2px 4px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04), 0 0 0 1px var(--outline)',
        'elev2': '0 4px 8px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.06), 0 0 0 1px var(--outline)',
        'elev3': '0 8px 16px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.08), 0 0 0 1px var(--outline)',
        'soft': '0 2px 8px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)',
        'soft-lg': '0 4px 16px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.08)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-in': 'springIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        springIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '60%': { transform: 'scale(1.02)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config


