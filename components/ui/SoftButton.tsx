'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SoftButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  variant?: 'primary' | 'sky' | 'yellow' | 'cream' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  depth?: 1 | 2
}

/**
 * SoftButton - Кнопка в стиле плюшевого неоморфизма
 * 
 * Принципы:
 * - Pill shape (полностью округлённая)
 * - Объёмный эффект через систему глубины
 * - Тактильная анимация при нажатии (вдавливание)
 * - Внутренний градиент для объёма
 * - 3 состояния цвета (Base, Pressed, Elevated)
 */
export const SoftButton = forwardRef<HTMLButtonElement, SoftButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    depth = 2,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false)
    
    // Базовые стили плюшевого неоморфизма
    const baseStyles = cn(
      'relative inline-flex items-center justify-center font-medium',
      'transition-all duration-200 ease-out',
      'touch-target', // Минимум 48x48px
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'focus:ring-plush-primary/30',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Pill shape
      'plush-rounded-pill',
      // Внутренний градиент для объёма
      'plush-gradient',
      // Микро-текстура
      'before:absolute before:inset-0 before:rounded-full',
      'before:opacity-[0.015] before:pointer-events-none',
      'before:bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'1\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")]',
      'before:bg-repeat before:bg-[length:50px_50px]'
    )
    
    // Варианты цветов с 3 состояниями
    const variants = {
      primary: cn(
        'bg-plush-primary text-white',
        'hover:bg-plush-primary-elevated',
        depth === 2 ? 'plush-depth-2' : 'plush-depth-1',
        'hover:shadow-plush-2',
        isPressed && 'bg-plush-primary-pressed shadow-plush-inset'
      ),
      sky: cn(
        'bg-plush-sky text-plush-graphite',
        'hover:bg-plush-sky-elevated',
        depth === 2 ? 'plush-depth-2' : 'plush-depth-1',
        'hover:shadow-plush-2',
        isPressed && 'bg-plush-sky-pressed shadow-plush-inset'
      ),
      yellow: cn(
        'bg-plush-yellow text-plush-graphite',
        'hover:bg-plush-yellow-elevated',
        depth === 2 ? 'plush-depth-2' : 'plush-depth-1',
        'hover:shadow-plush-2',
        isPressed && 'bg-plush-yellow-pressed shadow-plush-inset'
      ),
      cream: cn(
        'bg-plush-cream text-plush-graphite',
        'hover:bg-plush-cream-elevated',
        depth === 2 ? 'plush-depth-2' : 'plush-depth-1',
        'hover:shadow-plush-2',
        isPressed && 'bg-plush-cream-pressed shadow-plush-inset'
      ),
      ghost: cn(
        'bg-transparent text-plush-graphite',
        'hover:bg-plush-cream/30',
        'plush-depth-0',
        'border border-plush-graphite/10',
        isPressed && 'bg-plush-cream/50 shadow-plush-inset'
      ),
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-caption',
      md: 'px-6 py-3 text-body',
      lg: 'px-8 py-4 text-label',
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
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        whileHover={{ 
          y: -1,
          transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{ 
          scale: 0.97,
          y: 0,
          transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
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
        ) : (
          <span className="relative z-10">{children}</span>
        )}
      </motion.button>
    )
  }
)

SoftButton.displayName = 'SoftButton'
