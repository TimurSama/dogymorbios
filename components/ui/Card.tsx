'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  elevation?: 0 | 1 | 2 | 3
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    elevation = 2, 
    rounded = 'lg',
    hover = false,
    interactive = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'bg-surface-light dark:bg-surface-dark'
    
    const elevations = {
      0: 'elevation-0',
      1: 'elevation-1',
      2: 'elevation-2',
      3: 'elevation-3',
    }
    
    const roundings = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    }

    const Component = interactive ? motion.div : motion.div
    const motionProps = interactive ? {
      whileHover: { 
        y: -2, 
        transition: { type: 'spring', stiffness: 420, damping: 26 }
      },
      whileTap: { 
        scale: 0.98,
        transition: { type: 'spring', stiffness: 420, damping: 26 }
      },
    } : {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
    }

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          'bg-[var(--surface)]',
          elevations[elevation],
          roundings[rounded],
          'transition-all duration-200',
          interactive && 'cursor-pointer state-layer',
          hover && 'hover:shadow-soft-lg',
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'


