'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@/components/ui/Loader'

interface MapViewProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    id: string
    lat: number
    lng: number
    type: string
    name: string
  }>
  onMarkerClick?: (marker: any) => void
  className?: string
}

export function MapView({ 
  center, 
  zoom = 14, 
  markers = [], 
  onMarkerClick,
  className = '' 
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Загрузка Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google && window.google.maps) {
          initMap()
        } else {
          setMapError('Не удалось загрузить карту')
        }
      }
      script.onerror = () => {
        setMapError('Ошибка загрузки Google Maps. Используется упрощённый режим.')
        // Fallback на упрощённую карту
        setMapLoaded(true)
      }
      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom: zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e8e8e8' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      // Добавление маркеров
      markers.forEach(marker => {
        const mapMarker = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.name,
        })

        if (onMarkerClick) {
          mapMarker.addListener('click', () => onMarkerClick(marker))
        }
      })

      setMapLoaded(true)
    }

    loadGoogleMaps()

    return () => {
      // Cleanup
    }
  }, [center, zoom, markers, onMarkerClick])

  if (mapError) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-[var(--dog-sky)]/20 to-[var(--dog-honey)]/20 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-body text-[var(--md-sys-color-on-surface-variant)] mb-2">
            {mapError}
          </p>
          <p className="text-caption text-[var(--md-sys-color-on-surface-variant)]">
            Для полной функциональности карты необходим API ключ Google Maps
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--md-sys-color-surface)] z-10">
          <Loader variant="ball" size={48} />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}

// Расширение Window для TypeScript
declare global {
  interface Window {
    google?: {
      maps: typeof google.maps
    }
  }
}

