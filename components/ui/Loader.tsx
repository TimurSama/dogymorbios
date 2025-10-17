'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoaderProps {
  variant?: 'ball' | 'pawtrail' | 'medallion'
  size?: number
  className?: string
}

export function Loader({ variant = 'ball', size = 72, className }: LoaderProps) {
  if (variant === 'ball') {
    return (
      <div className={cn('flex justify-center items-center', className)} style={{ width: size, height: size }}>
        <motion.div
          className="rounded-full bg-honey"
          style={{ width: size * 0.3, height: size * 0.3 }}
          animate={{
            x: [0, size * 0.3, 0, -size * 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  if (variant === 'pawtrail') {
    return (
      <div className={cn('relative', className)} style={{ width: size, height: size }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: size * 0.15,
              height: size * 0.15,
              left: '50%',
              top: '50%',
              marginLeft: -size * 0.075,
              marginTop: -size * 0.075,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1, 0.8],
              rotate: [i * 60, i * 60],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-sky">
              <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'medallion') {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        <motion.div
          className="relative"
          style={{ width: size * 0.4, height: 4 }}
        >
          <div className="absolute w-full h-full bg-sky rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: [-15, 15, -15] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ originY: 0 }}
        >
          <svg
            width={size * 0.5}
            height={size * 0.5}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-burgundy"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      </div>
    )
  }

  return null
}


