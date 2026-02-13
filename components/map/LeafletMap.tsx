'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

    // Добавление новых маркеров
    markers.forEach(marker => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 30px;
          height: 30px;
          background: #4A7DFF;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })

      const mapMarker = L.marker([marker.lat, marker.lng], { icon })
        .addTo(mapRef.current!)

      if (onMarkerClick) {
        mapMarker.on('click', () => onMarkerClick(marker))
      }

      mapMarker.bindPopup(marker.name)
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
