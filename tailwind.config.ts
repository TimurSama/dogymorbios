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
        // Material Design 3 Colors
        'md-primary': 'var(--md-sys-color-primary)',
        'md-on-primary': 'var(--md-sys-color-on-primary)',
        'md-primary-container': 'var(--md-sys-color-primary-container)',
        'md-on-primary-container': 'var(--md-sys-color-on-primary-container)',
        'md-secondary': 'var(--md-sys-color-secondary)',
        'md-on-secondary': 'var(--md-sys-color-on-secondary)',
        'md-surface': 'var(--md-sys-color-surface)',
        'md-on-surface': 'var(--md-sys-color-on-surface)',
        'md-surface-variant': 'var(--md-sys-color-surface-variant)',
        'md-on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
        'md-outline': 'var(--md-sys-color-outline)',
        'md-outline-variant': 'var(--md-sys-color-outline-variant)',
        'md-error': 'var(--md-sys-color-error)',
        'md-on-error': 'var(--md-sys-color-on-error)',
        
        // Dogymorbis Brand Colors
        'dog-sky': 'var(--dog-sky)',
        'dog-honey': 'var(--dog-honey)',
        'dog-burgundy': 'var(--dog-burgundy)',
        'dog-chocolate': 'var(--dog-chocolate)',
        'dog-success': 'var(--dog-success)',
        'dog-warning': 'var(--dog-warning)',
        'dog-danger': 'var(--dog-danger)',
        'dog-info': 'var(--dog-info)',
        
        // Pastel Palette
        'dog-pastel-pink': 'var(--dog-pastel-pink)',
        'dog-pastel-lavender': 'var(--dog-pastel-lavender)',
        'dog-pastel-mint': 'var(--dog-pastel-mint)',
        'dog-pastel-peach': 'var(--dog-pastel-peach)',
        'dog-pastel-lilac': 'var(--dog-pastel-lilac)',
        'dog-pastel-rose': 'var(--dog-pastel-rose)',
        
        // Legacy compatibility
        'sky': 'var(--dog-sky)',
        'honey': 'var(--dog-honey)',
        'burgundy': 'var(--dog-burgundy)',
        'chocolate': 'var(--dog-chocolate)',
        'success': 'var(--dog-success)',
        'warning': 'var(--dog-warning)',
        'danger': 'var(--dog-danger)',
        'info': 'var(--dog-info)',
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


