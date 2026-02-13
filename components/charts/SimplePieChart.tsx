'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PieData {
  label: string
  value: number
  color: string
}

interface SimplePieChartProps {
  data: PieData[]
  size?: number
  showLegend?: boolean
  className?: string
}

/**
 * Простая круговая диаграмма в стиле плюшевого неоморфизма
 */
export function SimplePieChart({
  data,
  size = 200,
  showLegend = true,
  className,
}: SimplePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2

  let currentAngle = -90 // Начинаем сверху

  const segments = data.map((item, i) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const largeArcFlag = angle > 180 ? 1 : 0

    const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

    return {
      pathD,
      percentage,
      ...item,
    }
  })

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <svg width={size} height={size} className="overflow-visible">
        {segments.map((segment, i) => (
          <motion.path
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            d={segment.pathD}
            fill={segment.color}
            className="plush-depth-1"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        ))}
      </svg>

      {showLegend && (
        <div className="space-y-2 w-full">
          {segments.map((segment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full plush-depth-1"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-plush-graphite">{segment.label}</span>
              </div>
              <div className="text-sm font-semibold text-plush-graphite">
                {segment.percentage.toFixed(1)}%
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
