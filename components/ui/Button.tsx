'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'honey' | 'sky'
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
    // Базовые стили с мягкими тенями и плавными переходами
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium',
      'transition-all duration-200 ease-out',
      'state-layer',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'touch-target', // Минимум 44x44px на мобильных
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'focus:ring-[var(--sky)] focus:ring-opacity-50'
    )
    
    const variants = {
      primary: cn(
        'bg-[var(--sky)] text-[#1F1E1C]',
        'shadow-soft hover:shadow-soft-lg',
        'hover:brightness-105 active:brightness-95'
      ),
      honey: cn(
        'bg-[var(--honey)] text-[#1C1A19]',
        'shadow-soft hover:shadow-soft-lg',
        'hover:brightness-105 active:brightness-95'
      ),
      sky: cn(
        'bg-[var(--sky)] text-[#1F1E1C]',
        'shadow-soft hover:shadow-soft-lg',
        'hover:brightness-105 active:brightness-95'
      ),
      secondary: cn(
        'bg-[var(--surface-2)] dark:bg-[var(--surface-2)]',
        'text-[var(--text-primary)]',
        'shadow-soft hover:shadow-soft-lg',
        'border border-[var(--outline)]'
      ),
      ghost: cn(
        'bg-transparent text-[var(--text-primary)]',
        'hover:bg-[var(--state-hover)]',
        'border border-transparent'
      ),
      danger: cn(
        'bg-[var(--danger)] text-white',
        'shadow-soft hover:shadow-soft-lg',
        'hover:brightness-105 active:brightness-95'
      ),
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-caption rounded-lg',
      md: 'px-5 py-2.5 text-body rounded-lg',
      lg: 'px-6 py-3 text-label rounded-xl',
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
        whileHover={{ 
          y: -1,
          transition: { type: "spring", stiffness: 420, damping: 26 }
        }}
        whileTap={{ 
          scale: 0.97,
          y: 0,
          transition: { type: "spring", stiffness: 420, damping: 26 }
        }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            <span>Загрузка...</span>
          </div>
        ) : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'


