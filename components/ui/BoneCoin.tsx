'use client'

import { motion } from 'framer-motion'
import { BoneIcon } from '@/components/icons/DogymorbisIcons'
import { cn } from '@/lib/utils'

interface BoneCoinProps {
  amount: number | string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showIcon?: boolean
  className?: string
  variant?: 'default' | 'earned' | 'spent'
}

/**
 * Компонент визуализации BoneCoin
 * 3D-плоский гибрид с мягкой текстурой "резиновой игрушки"
 */
export function BoneCoin({
  amount,
  size = 'md',
  animated = false,
  showIcon = true,
  className,
  variant = 'default',
}: BoneCoinProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  const variants = {
    default: 'text-plush-yellow',
    earned: 'text-plush-yellow',
    spent: 'text-plush-graphite/60',
  }

  const animationProps = animated
    ? {
        initial: { scale: 0.8, opacity: 0, y: 10 },
        animate: { scale: 1, opacity: 1, y: 0 },
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        },
      }
    : {}

  return (
    <motion.div
      {...animationProps}
      className={cn(
        'inline-flex items-center gap-1.5',
        'font-bold',
        sizes[size],
        variants[variant],
        className
      )}
    >
      {showIcon && (
        <motion.div
          animate={animated ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 0.5,
            repeat: animated ? Infinity : 0,
            repeatDelay: 2,
          }}
          className="relative"
        >
          <BoneIcon 
            size={iconSizes[size]} 
            className={cn(
              'drop-shadow-sm',
              variant === 'earned' && 'animate-pulse'
            )}
          />
          {/* Мягкое свечение для earned */}
          {variant === 'earned' && (
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-plush-yellow rounded-full blur-sm -z-10"
            />
          )}
        </motion.div>
      )}
      <span>{typeof amount === 'number' ? amount.toLocaleString() : amount}</span>
    </motion.div>
  )
}

/**
 * Анимация начисления косточек
 */
export function BoneCoinAnimation({ amount, onComplete }: { amount: number; onComplete?: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-plush-cream plush-depth-3 rounded-plush-lg p-6 text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: 2,
          }}
        >
          <BoneIcon size={64} className="text-plush-yellow mx-auto mb-2" />
        </motion.div>
        <p className="text-2xl font-bold text-plush-graphite mb-1">
          +{amount.toLocaleString()}
        </p>
        <p className="text-sm text-plush-graphite/60">BoneCoin</p>
      </div>
    </motion.div>
  )
}
