'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BarData {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: BarData[]
  maxValue?: number
  height?: number
  showLabels?: boolean
  className?: string
}

/**
 * Простой бар-чарт в стиле плюшевого неоморфизма
 */
export function SimpleBarChart({
  data,
  maxValue,
  height = 200,
  showLabels = true,
  className,
}: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))
  const maxHeight = height - (showLabels ? 40 : 0)

  return (
    <div className={cn('w-full', className)}>
      <div className="relative" style={{ height }}>
        {/* Оси */}
        {showLabels && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end gap-2" style={{ height: maxHeight }}>
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' }}
                  className={cn(
                    'w-full rounded-t-lg plush-depth-1',
                    item.color || 'bg-plush-primary'
                  )}
                  style={{ minHeight: '4px' }}
                />
                <p className="text-xs text-plush-graphite/60 mt-2 text-center">
                  {item.label}
                </p>
                {showLabels && (
                  <p className="text-xs font-semibold text-plush-graphite mt-1">
                    {item.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
