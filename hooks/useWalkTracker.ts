'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useGeolocation } from './useGeolocation'

interface WalkPoint {
  lat: number
  lng: number
  timestamp: number
  accuracy?: number
}

interface WalkStats {
  distance: number // в метрах
  duration: number // в секундах
  averageSpeed: number // в км/ч
  maxSpeed: number // в км/ч
  points: WalkPoint[]
  startTime: number | null
}

// Функция для расчёта расстояния между двумя точками (формула гаверсинуса)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000 // Радиус Земли в метрах
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function useWalkTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [stats, setStats] = useState<WalkStats>({
    distance: 0,
    duration: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    points: [],
    startTime: null,
  })
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastPointRef = useRef<WalkPoint | null>(null)
  const { position, error } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
  })

  const startTracking = useCallback(() => {
    if (error) {
      console.error('Ошибка геолокации:', error)
      return false
    }

    setIsTracking(true)
    setStats({
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      maxSpeed: 0,
      points: [],
      startTime: Date.now(),
    })
    lastPointRef.current = null

    // Обновление статистики каждую секунду
    intervalRef.current = setInterval(() => {
      setStats((prev) => {
        if (!prev.startTime) return prev
        
        const duration = Math.floor((Date.now() - prev.startTime) / 1000)
        const averageSpeed = prev.distance > 0 && duration > 0
          ? (prev.distance / 1000) / (duration / 3600)
          : 0

        return {
          ...prev,
          duration,
          averageSpeed,
        }
      })
    }, 1000)

    return true
  }, [error])

  const stopTracking = useCallback(() => {
    setIsTracking(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetTracking = useCallback(() => {
    stopTracking()
    setStats({
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      maxSpeed: 0,
      points: [],
      startTime: null,
    })
    lastPointRef.current = null
  }, [stopTracking])

  // Отслеживание позиции и обновление маршрута
  useEffect(() => {
    if (!isTracking || !position) return

    const newPoint: WalkPoint = {
      lat: position.lat,
      lng: position.lng,
      timestamp: position.timestamp || Date.now(),
      accuracy: position.accuracy,
    }

    setStats((prev) => {
      const newPoints = [...prev.points, newPoint]
      let newDistance = prev.distance
      let newMaxSpeed = prev.maxSpeed

      if (lastPointRef.current) {
        const distance = calculateDistance(
          lastPointRef.current.lat,
          lastPointRef.current.lng,
          newPoint.lat,
          newPoint.lng
        )
        
        // Фильтруем слишком большие скачки (вероятно ошибка GPS)
        if (distance < 100) { // Максимум 100 метров между точками
          newDistance = prev.distance + distance
          
          // Расчёт скорости
          const timeDiff = (newPoint.timestamp - lastPointRef.current.timestamp) / 1000 // в секундах
          if (timeDiff > 0) {
            const speed = (distance / 1000) / (timeDiff / 3600) // км/ч
            if (speed > newMaxSpeed && speed < 50) { // Фильтр нереалистичных скоростей
              newMaxSpeed = speed
            }
          }
        }
      }

      lastPointRef.current = newPoint

      const duration = prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : 0
      const averageSpeed = newDistance > 0 && duration > 0
        ? (newDistance / 1000) / (duration / 3600)
        : 0

      return {
        ...prev,
        distance: newDistance,
        duration,
        averageSpeed,
        maxSpeed: newMaxSpeed,
        points: newPoints,
      }
    })
  }, [isTracking, position])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    isTracking,
    stats,
    startTracking,
    stopTracking,
    resetTracking,
    error,
  }
}

