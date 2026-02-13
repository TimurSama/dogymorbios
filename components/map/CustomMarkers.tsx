'use client'

import L from 'leaflet'
import { createElement } from 'react'
import { PawIcon, BoneIcon, DoghouseIcon } from '@/components/icons/DogymorbisIcons'

/**
 * Создание кастомных маркеров в стиле плюшевого неоморфизма
 */

// Иконка лапы для локаций
export const createPawIcon = (size: number = 32) => {
  return L.divIcon({
    className: 'custom-paw-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: #F4C542;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0px 4px 8px rgba(0, 0, 0, 0.12),
          0px 2px 4px rgba(255, 255, 255, 0.3) inset,
          -2px -2px 4px rgba(0, 0, 0, 0.05) inset;
        border: 2px solid rgba(255, 255, 255, 0.3);
      ">
        <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="none" stroke="#1F1F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11.5 2C10.5 2 9.5 2.5 9 3.5C8.5 2.5 7.5 2 6.5 2C4.5 2 3 3.5 3 5.5C3 7.5 4.5 9 6.5 9C7.5 9 8.5 8.5 9 7.5C9.5 8.5 10.5 9 11.5 9C13.5 9 15 7.5 15 5.5C15 3.5 13.5 2 11.5 2Z"/>
          <path d="M3 12C3 10.5 4.5 9 6.5 9C7.5 9 8.5 9.5 9 10.5C9.5 9.5 10.5 9 11.5 9C13.5 9 15 10.5 15 12C15 13.5 13.5 15 11.5 15C10.5 15 9.5 14.5 9 13.5C8.5 14.5 7.5 15 6.5 15C4.5 15 3 13.5 3 12Z"/>
          <path d="M6.5 15C7.5 15 8.5 15.5 9 16.5C9.5 15.5 10.5 15 11.5 15C13.5 15 15 16.5 15 18.5C15 20.5 13.5 22 11.5 22C10.5 22 9.5 21.5 9 20.5C8.5 21.5 7.5 22 6.5 22C4.5 22 3 20.5 3 18.5C3 16.5 4.5 15 6.5 15Z"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Иконка миски для магазинов
export const createBowlIcon = (size: number = 32) => {
  return L.divIcon({
    className: 'custom-bowl-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: #4A7DFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0px 4px 8px rgba(0, 0, 0, 0.12),
          0px 2px 4px rgba(255, 255, 255, 0.3) inset,
          -2px -2px 4px rgba(0, 0, 0, 0.05) inset;
        border: 2px solid rgba(255, 255, 255, 0.3);
      ">
        <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12C3 8 6 5 10 5C14 5 17 8 17 12C17 16 14 19 10 19C6 19 3 16 3 12Z"/>
          <path d="M3 12H21" stroke-width="1.5"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Иконка двойной лапы для совместных прогулок
export const createDoublePawIcon = (size: number = 32) => {
  return L.divIcon({
    className: 'custom-double-paw-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: #A7C7FF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0px 4px 8px rgba(0, 0, 0, 0.12),
          0px 2px 4px rgba(255, 255, 255, 0.3) inset,
          -2px -2px 4px rgba(0, 0, 0, 0.05) inset;
        border: 2px solid rgba(255, 255, 255, 0.3);
        position: relative;
      ">
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="#1F1F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 30%;">
          <path d="M11.5 2C10.5 2 9.5 2.5 9 3.5C8.5 2.5 7.5 2 6.5 2C4.5 2 3 3.5 3 5.5C3 7.5 4.5 9 6.5 9C7.5 9 8.5 8.5 9 7.5C9.5 8.5 10.5 9 11.5 9C13.5 9 15 7.5 15 5.5C15 3.5 13.5 2 11.5 2Z"/>
        </svg>
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="#1F1F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; right: 30%;">
          <path d="M11.5 2C10.5 2 9.5 2.5 9 3.5C8.5 2.5 7.5 2 6.5 2C4.5 2 3 3.5 3 5.5C3 7.5 4.5 9 6.5 9C7.5 9 8.5 8.5 9 7.5C9.5 8.5 10.5 9 11.5 9C13.5 9 15 7.5 15 5.5C15 3.5 13.5 2 11.5 2Z"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Иконка пользователя с пульсирующим свечением
export const createUserPulseIcon = (size: number = 40, isOnline: boolean = true) => {
  return L.divIcon({
    className: 'custom-user-pulse-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        position: relative;
      ">
        ${isOnline ? `
          <div style="
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: rgba(74, 125, 255, 0.3);
            animation: pulse 2s infinite;
          "></div>
        ` : ''}
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: #4A7DFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0px 4px 8px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(255, 255, 255, 0.3) inset;
          border: 2px solid rgba(255, 255, 255, 0.5);
          position: relative;
          z-index: 1;
        ">
          <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      </style>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Иконка приза (косточка)
export const createPrizeIcon = (size: number = 28, rarity: 'common' | 'rare' | 'epic' = 'common') => {
  const colors = {
    common: '#F4C542',
    rare: '#4A7DFF',
    epic: '#D64545',
  }

  return L.divIcon({
    className: 'custom-prize-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${colors[rarity]};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0px 3px 6px rgba(0, 0, 0, 0.15),
          0px 1px 3px rgba(255, 255, 255, 0.3) inset;
        border: 2px solid rgba(255, 255, 255, 0.4);
        animation: bounce 2s infinite;
      ">
        <svg width="${size * 0.7}" height="${size * 0.7}" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 12C6 10 8 8 10 8C12 8 14 10 14 12C14 14 12 16 10 16C8 16 6 14 6 12Z"/>
          <path d="M10 8V4"/>
          <path d="M10 16V20"/>
        </svg>
      </div>
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      </style>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}
