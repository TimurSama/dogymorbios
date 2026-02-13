'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

/**
 * Прогресс-бар в стиле плюшевого неоморфизма
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'plush-primary',
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-plush-graphite">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-plush-graphite">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-plush-cream-pressed plush-depth-0 overflow-hidden',
          heights[size]
        )}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: 'easeOut',
          }}
          className={cn(
            'h-full rounded-full plush-depth-1',
            `bg-${color}`
          )}
        />
      </div>
    </div>
  )
}
