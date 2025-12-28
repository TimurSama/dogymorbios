'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Loader } from './Loader'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
  disabled?: boolean
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80,
  disabled = false 
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const currentY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 300, damping: 30 })
  const opacity = useTransform(springY, [0, threshold], [0, 1])
  const scale = useTransform(springY, [0, threshold], [0.8, 1])

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (container.scrollTop === 0 && startY.current > 0) {
        currentY.current = e.touches[0].clientY
        const distance = Math.max(0, currentY.current - startY.current)
        
        if (distance > 0) {
          e.preventDefault()
          setPullDistance(distance)
          y.set(distance)
        }
      }
    }

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true)
        y.set(threshold)
        
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
          y.set(0)
          setPullDistance(0)
          startY.current = 0
          currentY.current = 0
        }
      } else {
        y.set(0)
        setPullDistance(0)
        startY.current = 0
        currentY.current = 0
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance, threshold, isRefreshing, onRefresh, disabled, y])

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
      {/* Pull to refresh indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-50"
        style={{
          y: springY,
          opacity,
          height: threshold,
        }}
      >
        <motion.div
          style={{ scale }}
          className="flex flex-col items-center gap-2"
        >
          {isRefreshing ? (
            <>
              <Loader variant="ball" size={32} />
              <span className="text-caption text-[var(--text-secondary)]">
                Обновление...
              </span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ rotate: pullDistance >= threshold ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[var(--sky)]"
                >
                  <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12" />
                  <path d="M12 3V15" />
                  <path d="M8 7L12 3L16 7" />
                </svg>
              </motion.div>
              <span className="text-caption text-[var(--text-secondary)]">
                {pullDistance >= threshold ? 'Отпустите для обновления' : 'Потяните для обновления'}
              </span>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          y: springY,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

