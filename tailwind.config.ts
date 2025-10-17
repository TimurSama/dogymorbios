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
        
        // Accents
        'sky': '#AFCBFF',
        'honey': '#E8DCA8',
        'burgundy': '#A95056',
        'chocolate': '#6B4B3E',
        'success': '#86C8BC',
        'warning': '#E1A177',
        'danger': '#E57C73',
        'info': '#7FA7D9',
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
      },
      boxShadow: {
        'elev0': '0 0 0 1px var(--outline)',
        'elev1': '0 1px 0 rgba(0,0,0,.06), 0 0 0 1px var(--outline)',
        'elev2': '0 2px 6px rgba(0,0,0,.10), 0 0 0 1px var(--outline)',
        'elev3': '0 4px 12px rgba(0,0,0,.14), 0 0 0 1px var(--outline)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
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
      },
    },
  },
  plugins: [],
}

export default config


