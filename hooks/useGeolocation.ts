'use client'

import { useState, useEffect, useRef } from 'react'

interface Position {
  lat: number
  lng: number
  accuracy?: number
  timestamp: number
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  onError?: (error: GeolocationPositionError) => void
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
  const [position, setPosition] = useState<Position | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const watchIdRef = useRef<number | null>(null)

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 0,
    onError,
  } = options

  useEffect(() => {
    if (!navigator.geolocation) {
      const geoError = {
        code: 0,
        message: 'Геолокация не поддерживается',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError
      
      setError(geoError)
      setIsLoading(false)
      onError?.(geoError)
      return
    }

    // Получаем текущую позицию
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        })
        setError(null)
        setIsLoading(false)
      },
      (err) => {
        setError(err)
        setIsLoading(false)
        onError?.(err)
      },
      { enableHighAccuracy, timeout, maximumAge }
    )

    // Начинаем отслеживание позиции
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        })
        setError(null)
      },
      (err) => {
        setError(err)
        onError?.(err)
      },
      { enableHighAccuracy, timeout, maximumAge }
    )

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [enableHighAccuracy, timeout, maximumAge, onError])

  return { position, error, isLoading }
}

