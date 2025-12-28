'use client'

import { useState, useEffect, useCallback } from 'react'

export type CollectibleType = 'BONE' | 'YARN_BALL' | 'TREAT' | 'TOY' | 'GOLDEN_BONE'

export interface Collectible {
  id: string
  type: CollectibleType
  lat: number
  lng: number
  value: number // BoneCoin награда
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  expiresAt: number // timestamp
  collected: boolean
}

interface UseCollectiblesOptions {
  userLat?: number
  userLng?: number
  radius?: number // радиус поиска в метрах
}

// Локации для спавна призов (пример для Москвы)
const SPAWN_LOCATIONS = [
  { lat: 55.7558, lng: 37.6173, name: 'Красная площадь' },
  { lat: 55.7520, lng: 37.6156, name: 'Парк Горького' },
  { lat: 55.7517, lng: 37.6178, name: 'Воробьёвы горы' },
  { lat: 55.7525, lng: 37.6231, name: 'Центральный парк' },
  { lat: 55.7500, lng: 37.6200, name: 'Собачья площадка' },
  // Добавить больше локаций
]

const COLLECTIBLE_CONFIG: Record<CollectibleType, { value: number; rarity: string }> = {
  BONE: { value: 10, rarity: 'common' },
  YARN_BALL: { value: 25, rarity: 'rare' },
  TREAT: { value: 50, rarity: 'epic' },
  TOY: { value: 75, rarity: 'epic' },
  GOLDEN_BONE: { value: 100, rarity: 'legendary' },
}

// Генерация случайного типа приза на основе вероятности
function generateCollectibleType(): CollectibleType {
  const rand = Math.random()
  if (rand < 0.5) return 'BONE' // 50%
  if (rand < 0.75) return 'YARN_BALL' // 25%
  if (rand < 0.9) return 'TREAT' // 15%
  if (rand < 0.98) return 'TOY' // 8%
  return 'GOLDEN_BONE' // 2%
}

// Расчёт расстояния между двумя точками
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function useCollectibles(options: UseCollectiblesOptions = {}) {
  const { userLat, userLng, radius = 500 } = options
  const [collectibles, setCollectibles] = useState<Collectible[]>([])
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set())

  // Генерация призов на локациях
  const generateCollectibles = useCallback(() => {
    const newCollectibles: Collectible[] = SPAWN_LOCATIONS.map((location, index) => {
      const type = generateCollectibleType()
      const config = COLLECTIBLE_CONFIG[type]
      
      // Добавляем небольшое случайное смещение (до 50 метров)
      const offsetLat = (Math.random() - 0.5) * 0.0005
      const offsetLng = (Math.random() - 0.5) * 0.0005

      return {
        id: `collectible_${Date.now()}_${index}`,
        type,
        lat: location.lat + offsetLat,
        lng: location.lng + offsetLng,
        value: config.value,
        rarity: config.rarity as 'common' | 'rare' | 'epic' | 'legendary',
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 минут
        collected: false,
      }
    })

    setCollectibles(newCollectibles)
  }, [])

  // Фильтрация призов по расстоянию
  const getNearbyCollectibles = useCallback((): Collectible[] => {
    if (!userLat || !userLng) return []

    return collectibles
      .filter(c => !c.collected && c.expiresAt > Date.now())
      .map(c => ({
        ...c,
        distance: calculateDistance(userLat, userLng, c.lat, c.lng),
      }))
      .filter(c => c.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
  }, [collectibles, userLat, userLng, radius])

  // Сбор приза
  const collect = useCallback((id: string): Collectible | null => {
    const collectible = collectibles.find(c => c.id === id)
    if (!collectible || collectible.collected || collectible.expiresAt < Date.now()) {
      return null
    }

    // Проверка расстояния
    if (userLat && userLng) {
      const distance = calculateDistance(userLat, userLng, collectible.lat, collectible.lng)
      if (distance > 50) { // Максимум 50 метров для сбора
        return null
      }
    }

    setCollectibles(prev => 
      prev.map(c => c.id === id ? { ...c, collected: true } : c)
    )
    setCollectedIds(prev => new Set([...prev, id]))

    return collectible
  }, [collectibles, userLat, userLng])

  // Автоматическая генерация каждые 15 минут
  useEffect(() => {
    generateCollectibles()
    const interval = setInterval(generateCollectibles, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [generateCollectibles])

  // Удаление истёкших призов
  useEffect(() => {
    const interval = setInterval(() => {
      setCollectibles(prev => prev.filter(c => c.expiresAt > Date.now()))
    }, 60000) // Проверка каждую минуту

    return () => clearInterval(interval)
  }, [])

  const nearby = getNearbyCollectibles()

  return {
    collectibles,
    nearbyCollectibles: nearby,
    collect,
    collectedIds,
    generateCollectibles,
  }
}

