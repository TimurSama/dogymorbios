'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SoftCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  depth?: 0 | 1 | 2 | 3
  rounded?: 'min' | 'card' | 'card-lg'
  hover?: boolean
  interactive?: boolean
  color?: 'cream' | 'white' | 'sky' | 'yellow'
}

/**
 * SoftCard - Карточка в стиле плюшевого неоморфизма
 * 
 * Принципы:
 * - Объёмный эффект через систему глубины (4 уровня)
 * - Формула объёма: внешняя светлая тень + внешняя тёмная тень + внутренний градиент
 * - Скругления 20-24px
 * - Микро-текстура для эффекта плюша
 * - Тактильная анимация при взаимодействии
 */
export const SoftCard = forwardRef<HTMLDivElement, SoftCardProps>(
  ({ 
    className, 
    depth = 1, 
    rounded = 'card',
    hover = false,
    interactive = false,
    color = 'cream',
    children, 
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false)
    
    // Базовые стили плюшевого неоморфизма
    const baseStyles = cn(
      'relative',
      'transition-all duration-200 ease-out',
      // Внутренний градиент для объёма
      'plush-gradient',
      // Микро-текстура
      'before:absolute before:inset-0 before:rounded-[inherit]',
      'before:opacity-[0.02] before:pointer-events-none',
      'before:bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")]',
      'before:bg-repeat before:bg-[length:200px_200px]',
      // Радиальный градиент для мягкости
      'after:absolute after:inset-0 after:rounded-[inherit]',
      'after:opacity-30 after:pointer-events-none',
      'after:bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_50%)]',
      'after:bg-[length:100%_100%] after:bg-[position:20%_30%]'
    )
    
    // Цвета фона
    const colors = {
      cream: 'bg-plush-cream',
      white: 'bg-white',
      sky: 'bg-plush-sky/30',
      yellow: 'bg-plush-yellow/30',
    }
    
    // Система глубины
    const depths = {
      0: 'plush-depth-0',
      1: cn(
        'plush-depth-1',
        hover && 'hover:shadow-plush-2',
        isPressed && 'shadow-plush-inset'
      ),
      2: cn(
        'plush-depth-2',
        hover && 'hover:shadow-plush-3',
        isPressed && 'shadow-plush-inset'
      ),
      3: cn(
        'plush-depth-3',
        isPressed && 'shadow-plush-inset'
      ),
    }
    
    // Скругления
    const roundings = {
      min: 'plush-rounded',
      card: 'plush-rounded-card',
      'card-lg': 'plush-rounded-card-large',
    }

    const Component = interactive ? motion.div : motion.div
    const motionProps = interactive ? {
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onMouseLeave: () => setIsPressed(false),
      whileHover: { 
        y: -2, 
        transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
      },
      whileTap: { 
        scale: 0.98,
        y: 0,
        transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
      },
    } : {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    }

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          colors[color],
          depths[depth],
          roundings[rounded],
          interactive && 'cursor-pointer',
          className
        )}
        {...motionProps}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    )
  }
)

SoftCard.displayName = 'SoftCard'
