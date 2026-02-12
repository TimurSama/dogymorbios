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
        // Плюшевый неоморфизм - Основные цвета
        'plush-primary': {
          DEFAULT: 'var(--plush-primary-blue)',
          pressed: 'var(--plush-primary-blue-pressed)',
          elevated: 'var(--plush-primary-blue-elevated)',
        },
        'plush-sky': {
          DEFAULT: 'var(--plush-soft-sky)',
          pressed: 'var(--plush-soft-sky-pressed)',
          elevated: 'var(--plush-soft-sky-elevated)',
        },
        'plush-yellow': {
          DEFAULT: 'var(--plush-warm-yellow)',
          pressed: 'var(--plush-warm-yellow-pressed)',
          elevated: 'var(--plush-warm-yellow-elevated)',
        },
        'plush-cream': {
          DEFAULT: 'var(--plush-cream-sand)',
          pressed: 'var(--plush-cream-sand-pressed)',
          elevated: 'var(--plush-cream-sand-elevated)',
        },
        'plush-graphite': {
          DEFAULT: 'var(--plush-graphite-dark)',
          pressed: 'var(--plush-graphite-dark-pressed)',
          elevated: 'var(--plush-graphite-dark-elevated)',
        },
        'plush-navy': 'var(--plush-deep-navy)',
        'plush-brown': 'var(--plush-muted-brown)',
        'plush-beige': 'var(--plush-soft-beige-fur)',
        'plush-alert': 'var(--plush-alert-red)',
        
        // Material Design 3 Colors (legacy)
        'md-primary': 'var(--md-sys-color-primary)',
        'md-on-primary': 'var(--md-sys-color-on-primary)',
        'md-surface': 'var(--md-sys-color-surface)',
        'md-on-surface': 'var(--md-sys-color-on-surface)',
        
        // Dogymorbis Brand Colors (legacy compatibility)
        'dog-sky': 'var(--dog-sky)',
        'dog-honey': 'var(--dog-honey)',
        'dog-burgundy': 'var(--dog-burgundy)',
        'dog-chocolate': 'var(--dog-chocolate)',
        'dog-success': 'var(--dog-success)',
        'dog-warning': 'var(--dog-warning)',
        'dog-danger': 'var(--dog-danger)',
        'dog-info': 'var(--dog-info)',
        
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
        sans: ['Inter', 'Manrope', 'SF Pro Rounded', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
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
        'plush': 'var(--plush-radius-min)',
        'plush-card': 'var(--plush-radius-card)',
        'plush-card-lg': 'var(--plush-radius-card-large)',
        'plush-pill': 'var(--plush-radius-button)',
      },
      spacing: {
        'touch': '44px', // Минимальный размер touch-зоны
      },
      boxShadow: {
        'plush-0': 'var(--plush-depth-0)',
        'plush-1': 'var(--plush-depth-1)',
        'plush-2': 'var(--plush-depth-2)',
        'plush-3': 'var(--plush-depth-3)',
        'plush-inset': 'var(--plush-inset)',
        'elev0': '0 0 0 1px var(--outline)',
        'elev1': 'var(--plush-depth-1)',
        'elev2': 'var(--plush-depth-2)',
        'elev3': 'var(--plush-depth-3)',
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
        'plush-bounce': 'plushBounce 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'plush-grow': 'plushGrow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
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
        plushBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        plushGrow: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config


