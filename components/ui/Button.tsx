'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 state-layer tap-compress disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-sky text-text-primary-dark hover:brightness-110 elevation-1',
      secondary: 'bg-surface-2-light dark:bg-surface2-dark text-text-primary-light dark:text-text-primary-dark elevation-1',
      ghost: 'bg-transparent text-text-primary-light dark:text-text-primary-dark hover:bg-state-hover',
      danger: 'bg-danger text-white hover:brightness-110 elevation-1',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-caption',
      md: 'px-4 py-2 text-body',
      lg: 'px-6 py-3 text-label',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        whileTap={{ scale: 0.985 }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Загрузка...</span>
          </div>
        ) : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'


