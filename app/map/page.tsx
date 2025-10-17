'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Play, Square, Filter, Users, Calendar } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { TreeIcon, BowlIcon, PawIcon } from '@/components/icons/DogymorbisIcons'

interface MapMarker {
  id: string
  type: 'location' | 'store' | 'user' | 'event'
  name: string
  lat: number
  lng: number
  distance?: string
  online?: boolean
}

const mockMarkers: MapMarker[] = [
  { id: '1', type: 'location', name: 'Парк Горького', lat: 55.7312, lng: 37.6056, distance: '0.5 км' },
  { id: '2', type: 'store', name: 'Зоомагазин "Четыре лапы"', lat: 55.7322, lng: 37.6066, distance: '1.2 км' },
  { id: '3', type: 'user', name: 'Макс с Рексом', lat: 55.7302, lng: 37.6046, distance: '0.3 км', online: true },
  { id: '4', type: 'event', name: 'Встреча владельцев хаски', lat: 55.7332, lng: 37.6076, distance: '1.5 км' },
  { id: '5', type: 'location', name: 'Собачья площадка', lat: 55.7342, lng: 37.6086, distance: '2.1 км' },
]

const categories = [
  { id: 'all', label: 'Все', icon: <MapPin size={14} /> },
  { id: 'locations', label: 'Локации', icon: <TreeIcon size={14} /> },
  { id: 'stores', label: 'Магазины', icon: <BowlIcon size={14} /> },
  { id: 'users', label: 'Пользователи', icon: <PawIcon size={14} /> },
  { id: 'events', label: 'События', icon: <Calendar size={14} /> },
]

export default function MapPage() {
  const [isWalking, setIsWalking] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [walkStats, setWalkStats] = useState({ distance: 0, duration: 0, boneCoin: 0 })

  const filteredMarkers = selectedCategory === 'all' 
    ? mockMarkers 
    : mockMarkers.filter(m => {
        if (selectedCategory === 'locations') return m.type === 'location'
        if (selectedCategory === 'stores') return m.type === 'store'
        if (selectedCategory === 'users') return m.type === 'user'
        if (selectedCategory === 'events') return m.type === 'event'
        return true
      })

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'location': return <TreeIcon size={20} className="text-success" />
      case 'store': return <BowlIcon size={20} className="text-honey" />
      case 'user': return <PawIcon size={20} className="text-sky" />
      case 'event': return <Calendar size={20} className="text-burgundy" />
      default: return <MapPin size={20} />
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Карта прогулок" 
        actions={
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 state-layer">
            <Filter size={20} className="text-text-primary-light dark:text-text-primary-dark" />
          </button>
        }
      />

      <div className="flex-1 relative bg-surface2-light dark:bg-surface2-dark">
        {/* Карта (заглушка) */}
        <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-sky/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation size={48} className="mx-auto mb-4 text-sky animate-pulse" />
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                Интерактивная карта
              </p>
              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mt-1">
                (здесь будет интеграция с Google Maps / Mapbox)
              </p>
            </div>
          </div>

          {/* Маркеры на карте */}
          {filteredMarkers.map((marker, index) => (
            <motion.div
              key={marker.id}
              className="absolute"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 3) * 20}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <div className="bg-white dark:bg-surface-dark rounded-full p-2 elevation-2">
                  {getMarkerIcon(marker.type)}
                </div>
                {marker.online && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white dark:border-surface-dark" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Категории фильтров */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Контрол прогулки */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          {isWalking && (
            <Card className="p-4 mb-4" elevation={3}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Прогулка в процессе
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                  <span className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                    Запись
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">Расстояние</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                    {walkStats.distance} км
                  </p>
                </div>
                <div>
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">Время</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                    {walkStats.duration} мин
                  </p>
                </div>
                <div>
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">BoneCoin</p>
                  <p className="text-label font-bold text-sky">
                    +{walkStats.boneCoin} 🦴
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Button
            fullWidth
            size="lg"
            variant={isWalking ? 'danger' : 'primary'}
            onClick={() => {
              setIsWalking(!isWalking)
              if (!isWalking) {
                // Симуляция прогулки
                const interval = setInterval(() => {
                  setWalkStats(prev => ({
                    distance: parseFloat((prev.distance + 0.1).toFixed(1)),
                    duration: prev.duration + 1,
                    boneCoin: prev.boneCoin + 1,
                  }))
                }, 1000)
                return () => clearInterval(interval)
              } else {
                setWalkStats({ distance: 0, duration: 0, boneCoin: 0 })
              }
            }}
          >
            {isWalking ? (
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
        </div>

        {/* Список рядом */}
        <div className="absolute right-4 top-24 z-10">
          <Card className="w-64 p-3" elevation={3}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-sky" />
              <h4 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                Рядом с вами
              </h4>
            </div>
            <div className="space-y-2">
              {filteredMarkers.slice(0, 3).map((marker) => (
                <div
                  key={marker.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  {getMarkerIcon(marker.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                      {marker.name}
                    </p>
                    <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                      {marker.distance}
                    </p>
                  </div>
                  {marker.online && (
                    <div className="w-2 h-2 bg-success rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


