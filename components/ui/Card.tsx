'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
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

    const Component = interactive ? motion.div : 'div'
    const motionProps = interactive ? {
      whileHover: { y: -2, transition: { duration: 0.15 } },
      whileTap: { scale: 0.99 },
    } : {}

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          elevations[elevation],
          roundings[rounded],
          interactive && 'cursor-pointer state-layer',
          hover && 'hover:-translate-y-1 transition-transform duration-150',
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


