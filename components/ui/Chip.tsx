'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  label: string
  onRemove?: () => void
  selected?: boolean
  icon?: React.ReactNode
}

export function Chip({ 
  label, 
  onRemove, 
  selected = false, 
  icon,
  className,
  ...props 
}: ChipProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption font-medium',
        'bg-surface2-light dark:bg-surface2-dark',
        'border border-outline-light dark:border-outline-dark',
        'transition-all duration-150',
        selected && 'bg-honey border-chocolate text-text-primary-dark',
        onRemove && 'pr-1.5',
        'state-layer cursor-pointer',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </motion.div>
  )
}


