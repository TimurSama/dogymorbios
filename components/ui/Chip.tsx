'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  label: string
  onRemove?: () => void
  selected?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

export function Chip({ 
  label, 
  onRemove, 
  selected = false, 
  icon,
  onClick,
  className,
  ...props 
}: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-medium',
        'bg-[var(--md-sys-color-surface-variant)]',
        'border border-[var(--md-sys-color-outline-variant)]',
        'transition-all duration-200',
        selected && 'bg-[var(--dog-sky)]/20 border-[var(--dog-sky)] text-[var(--dog-sky)]',
        onRemove && 'pr-1.5',
        'state-layer cursor-pointer touch-target',
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
          className="ml-1 hover:bg-[var(--md-state-hover)] rounded-full p-0.5 transition-colors touch-target"
        >
          <X size={14} />
        </button>
      )}
    </motion.button>
  )
}


