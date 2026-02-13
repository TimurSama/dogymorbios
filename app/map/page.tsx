'use client'

import { useState, useEffect } from 'react'

// Отключаем SSR для страницы карты, так как Leaflet требует window
export const dynamic = 'force-dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Filter, Users, Calendar, Sparkles } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { TreeIcon, BowlIcon, PawIcon } from '@/components/icons/DogymorbisIcons'
import { WalkTracker } from '@/components/map/WalkTracker'
import { CollectibleMarker } from '@/components/map/CollectibleMarker'
import dynamic from 'next/dynamic'

// Динамический импорт LeafletMap, чтобы избежать SSR
const LeafletMap = dynamic(() => import('@/components/map/LeafletMap').then(mod => ({ default: mod.LeafletMap })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-plush-cream flex items-center justify-center">Загрузка карты...</div>
})
import { useGeolocation } from '@/hooks/useGeolocation'
import { useCollectibles } from '@/hooks/useCollectibles'

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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCollectibles, setShowCollectibles] = useState(true)
  const [totalBoneCoinEarned, setTotalBoneCoinEarned] = useState(0)
  
  // Геолокация пользователя
  const { position, error: geoError } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
  })
  const userPosition = position ? { lat: position.lat, lng: position.lng } : null

  // Система сбора призов
  const {
    collectibles: nearbyCollectibles,
    collect,
    collectedIds,
  } = useCollectibles({
    userLat: position?.lat,
    userLng: position?.lng,
    radius: 50, // 50 метров
  })

  // Обработка сбора приза
  const handleCollect = (id: string) => {
    const collected = collect(id)
    if (collected) {
      setTotalBoneCoinEarned(prev => prev + collected.value)
      // Здесь можно добавить анимацию и звук
    }
  }

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
    <div className="flex flex-col h-screen bg-[var(--bg)] safe-area-top">
      <AppBar 
        title="Карта прогулок" 
        actions={
          <motion.button 
            className="p-2 rounded-lg state-layer touch-target"
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={20} className="text-[var(--text-primary)]" />
          </motion.button>
        }
      />

      <div className="flex-1 relative bg-[var(--md-sys-color-surface-variant)] overflow-hidden">
        {/* Реальная карта */}
        <LeafletMap
          center={{
            lat: userPosition?.lat || 55.7558,
            lng: userPosition?.lng || 37.6173,
          }}
          zoom={14}
          markers={filteredMarkers.map(m => ({
            id: m.id,
            lat: m.lat,
            lng: m.lng,
            type: m.type,
            name: m.name,
          }))}
          onMarkerClick={(marker) => {
            console.log('Marker clicked:', marker)
          }}
          className="absolute inset-0"
        />

        {/* Маркеры на карте */}
        {filteredMarkers.map((marker, index) => (
          <motion.div
            key={marker.id}
            className="absolute z-10"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 3) * 20}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <div className="bg-[var(--md-sys-color-surface)] rounded-full p-2 elevation-2">
                {getMarkerIcon(marker.type)}
              </div>
              {marker.online && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--dog-success)] rounded-full border-2 border-[var(--md-sys-color-surface)]" />
              )}
            </div>
          </motion.div>
        ))}

        {/* Категории фильтров - мобильная оптимизация */}
        <div className="absolute top-2 left-2 right-2 z-10 md:top-4 md:left-4 md:right-4">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar scrollbar-hide">
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
            <Chip
              label="Призы"
              icon={<Sparkles size={14} />}
              selected={showCollectibles}
              onClick={() => setShowCollectibles(!showCollectibles)}
            />
          </div>
        </div>

        {/* Маркеры призов на карте */}
        {showCollectibles && userPosition && nearbyCollectibles.map((collectible) => {
          // Упрощённое позиционирование (в реальности нужна конвертация lat/lng в пиксели карты)
          // Для демо используем относительное позиционирование
          const latDiff = collectible.lat - userPosition.lat
          const lngDiff = collectible.lng - userPosition.lng
          const scale = 50000 // масштаб для конвертации градусов в проценты
          
          return (
            <div
              key={collectible.id}
              className="absolute z-20"
              style={{
                left: `${50 + lngDiff * scale}%`,
                top: `${50 + latDiff * scale}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CollectibleMarker
                collectible={collectible}
                onCollect={handleCollect}
                distance={(collectible as any).distance}
              />
            </div>
          )
        })}

        {/* Индикатор собранных призов */}
        {totalBoneCoinEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
          >
            <Card className="p-3 bg-[var(--dog-honey)]/90 backdrop-blur-sm" elevation={3}>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-[var(--md-sys-color-on-surface)]" />
                <span className="text-body font-semibold text-[var(--md-sys-color-on-surface)]">
                  +{totalBoneCoinEarned} 🦴 собрано!
                </span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Контрол прогулки - мобильная оптимизация */}
        <div className="absolute bottom-2 left-2 right-2 z-10 md:bottom-4 md:left-4 md:right-4 safe-area-bottom">
          <WalkTracker
            onSave={(stats) => {
              // Сохранение статистики прогулки
              console.log('Сохранение прогулки:', stats)
              // Здесь будет API вызов для сохранения
            }}
          />
        </div>

        {/* Список рядом - скрыт на мобильных, показывается на планшетах+ */}
        <div className="hidden md:block absolute right-4 top-24 z-10">
          <Card className="w-64 p-3" elevation={3}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-[var(--dog-sky)]" />
              <h4 className="text-body font-semibold text-[var(--md-sys-color-on-surface)]">
                Рядом с вами
              </h4>
            </div>
            <div className="space-y-2">
              {filteredMarkers.slice(0, 3).map((marker) => (
                <div
                  key={marker.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--md-state-hover)] cursor-pointer transition-colors state-layer"
                >
                  {getMarkerIcon(marker.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-medium text-[var(--md-sys-color-on-surface)] truncate">
                      {marker.name}
                    </p>
                    <p className="text-caption text-[var(--md-sys-color-on-surface-variant)]">
                      {marker.distance}
                    </p>
                  </div>
                  {marker.online && (
                    <div className="w-2 h-2 bg-[var(--dog-success)] rounded-full" />
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


