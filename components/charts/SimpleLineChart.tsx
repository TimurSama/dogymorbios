'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Point {
  x: number
  y: number
  label?: string
}

interface SimpleLineChartProps {
  data: Point[]
  width?: number
  height?: number
  color?: string
  showArea?: boolean
  showDots?: boolean
  className?: string
}

/**
 * Простой линейный график в стиле плюшевого неоморфизма
 */
export function SimpleLineChart({
  data,
  width = 400,
  height = 200,
  color = 'var(--plush-primary)',
  showArea = false,
  showDots = true,
  className,
}: SimpleLineChartProps) {
  const maxX = Math.max(...data.map(d => d.x))
  const maxY = Math.max(...data.map(d => d.y))
  const minY = Math.min(...data.map(d => d.y))

  const padding = 20
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data.map((point, i) => ({
    x: padding + (point.x / maxX) * chartWidth,
    y: padding + chartHeight - ((point.y - minY) / (maxY - minY)) * chartHeight,
    label: point.label,
  }))

  const pathD = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaPathD = `${pathD} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`

  return (
    <div className={cn('w-full', className)}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Область под графиком */}
        {showArea && (
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1 }}
            d={areaPathD}
            fill={color}
          />
        )}
        
        {/* Линия графика */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Точки */}
        {showDots && points.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={color}
            className="plush-depth-1"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        ))}
      </svg>
    </div>
  )
}
