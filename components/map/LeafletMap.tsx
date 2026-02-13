'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  createPawIcon, 
  createBowlIcon, 
  createDoublePawIcon, 
  createUserPulseIcon,
  createPrizeIcon 
} from './CustomMarkers'

interface LeafletMapProps {
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

export function LeafletMap({ 
  center, 
  zoom = 14, 
  markers = [], 
  onMarkerClick,
  className = '' 
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Инициализация карты
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: zoom,
        zoomControl: true,
      })

      // Добавление тайлов OpenStreetMap (бесплатно, без API ключа)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)
    } else {
      mapRef.current.setView([center.lat, center.lng], zoom)
    }

    // Очистка старых маркеров
    markersRef.current.forEach(marker => {
      mapRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Добавление новых маркеров с кастомными иконками
    markers.forEach(marker => {
      let icon
      
      // Выбор иконки в зависимости от типа маркера
      switch (marker.type) {
        case 'location':
          icon = createPawIcon(32)
          break
        case 'store':
          icon = createBowlIcon(32)
          break
        case 'user':
          icon = createUserPulseIcon(40, true)
          break
        case 'event':
          icon = createDoublePawIcon(36)
          break
        case 'prize':
          icon = createPrizeIcon(28, 'common')
          break
        default:
          icon = createPawIcon(32)
      }

      const mapMarker = L.marker([marker.lat, marker.lng], { icon })
        .addTo(mapRef.current!)

      if (onMarkerClick) {
        mapMarker.on('click', () => onMarkerClick(marker))
      }

      mapMarker.bindPopup(`
        <div style="
          padding: 8px;
          font-family: var(--plush-font-family);
          color: var(--plush-graphite-dark);
        ">
          <strong>${marker.name}</strong>
        </div>
      `)
      markersRef.current.push(mapMarker)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom, markers, onMarkerClick])

  return (
    <div 
      ref={mapContainerRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  )
}
