'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, MapPin, Clock, TrendingUp, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useWalkTracker } from '@/hooks/useWalkTracker'
import { formatTime } from '@/lib/utils'

interface WalkTrackerProps {
  onSave?: (stats: ReturnType<typeof useWalkTracker>['stats']) => void
}

export function WalkTracker({ onSave }: WalkTrackerProps) {
  const { isTracking, stats, startTracking, stopTracking, resetTracking, error } = useWalkTracker()

  const handleToggle = () => {
    if (isTracking) {
      stopTracking()
      if (onSave && stats.points.length > 0) {
        onSave(stats)
      }
    } else {
      if (error) {
        alert('Ошибка геолокации. Разрешите доступ к геолокации в настройках браузера.')
        return
      }
      startTracking()
    }
  }

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} м`
    }
    return `${(meters / 1000).toFixed(2)} км`
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Расчёт BoneCoin (1 BoneCoin за 100 метров)
  const boneCoinEarned = Math.floor(stats.distance / 100)

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <Card className="p-4" elevation={2}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-[var(--danger)] rounded-full"
                  />
                  <span className="text-body font-semibold text-[var(--text-primary)]">
                    Прогулка в процессе
                  </span>
                </div>
                <span className="text-caption text-[var(--text-secondary)]">
                  {formatDuration(stats.duration)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <MapPin size={20} className="mx-auto mb-1 text-[var(--sky)]" />
                  <p className="text-caption text-[var(--text-secondary)] mb-1">Расстояние</p>
                  <p className="text-label font-bold text-[var(--text-primary)]">
                    {formatDistance(stats.distance)}
                  </p>
                </div>
                <div className="text-center">
                  <Clock size={20} className="mx-auto mb-1 text-[var(--honey)]" />
                  <p className="text-caption text-[var(--text-secondary)] mb-1">Время</p>
                  <p className="text-label font-bold text-[var(--text-primary)]">
                    {formatDuration(stats.duration)}
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp size={20} className="mx-auto mb-1 text-[var(--success)]" />
                  <p className="text-caption text-[var(--text-secondary)] mb-1">Скорость</p>
                  <p className="text-label font-bold text-[var(--text-primary)]">
                    {stats.averageSpeed.toFixed(1)} км/ч
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--honey)]/20">
                <Award size={20} className="text-[var(--honey)]" />
                <span className="text-body font-semibold text-[var(--text-primary)]">
                  +{boneCoinEarned} 🦴 BoneCoin
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        fullWidth
        size="lg"
        variant={isTracking ? 'danger' : 'honey'}
        onClick={handleToggle}
        className="touch-target"
      >
        {isTracking ? (
          <>
            <Square size={20} className="mr-2" fill="currentColor" />
            Остановить прогулку
          </>
        ) : (
          <>
            <Play size={20} className="mr-2" fill="currentColor" />
            Начать прогулку
          </>
        )}
      </Button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]"
        >
          <p className="text-caption text-[var(--danger)] text-center">
            {error.message || 'Ошибка доступа к геолокации'}
          </p>
        </motion.div>
      )}
    </div>
  )
}

