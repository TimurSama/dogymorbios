'use client'

import { motion } from 'framer-motion'
import { BoneIcon } from '@/components/icons/DogymorbisIcons'
import { Collectible, CollectibleType } from '@/hooks/useCollectibles'

interface CollectibleMarkerProps {
  collectible: Collectible
  onCollect: (id: string) => void
  distance?: number
}

const COLLECTIBLE_ICONS: Record<CollectibleType, { emoji: string; color: string }> = {
  BONE: { emoji: '🦴', color: 'text-[var(--honey)]' },
  YARN_BALL: { emoji: '🧶', color: 'text-[var(--pastel-lavender)]' },
  TREAT: { emoji: '🍖', color: 'text-[var(--pastel-peach)]' },
  TOY: { emoji: '🎾', color: 'text-[var(--sky)]' },
  GOLDEN_BONE: { emoji: '✨', color: 'text-[var(--honey)]' },
}

const RARITY_GLOW: Record<string, string> = {
  common: 'shadow-[var(--honey)]/50',
  rare: 'shadow-[var(--sky)]/50',
  epic: 'shadow-[var(--pastel-lavender)]/50',
  legendary: 'shadow-[var(--honey)]/70',
}

export function CollectibleMarker({ collectible, onCollect, distance }: CollectibleMarkerProps) {
  const icon = COLLECTIBLE_ICONS[collectible.type]
  const glow = RARITY_GLOW[collectible.rarity]

  const handleClick = () => {
    if (distance && distance <= 50) {
      onCollect(collectible.id)
    }
  }

  return (
    <motion.div
      className="absolute cursor-pointer touch-target z-20"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: 1,
      }}
      transition={{ 
        scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 0.3 }
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <div className={`relative ${distance && distance <= 50 ? 'animate-pulse' : ''}`}>
        {/* Glow эффект для редких призов */}
        {collectible.rarity !== 'common' && (
          <motion.div
            className={`absolute inset-0 rounded-full ${glow}`}
            animate={{
              boxShadow: [
                `0 0 10px ${collectible.rarity === 'legendary' ? 'var(--honey)' : 'var(--sky)'}`,
                `0 0 20px ${collectible.rarity === 'legendary' ? 'var(--honey)' : 'var(--sky)'}`,
                `0 0 10px ${collectible.rarity === 'legendary' ? 'var(--honey)' : 'var(--sky)'}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Иконка приза */}
        <div className={`
          relative w-12 h-12 rounded-full 
          bg-[var(--surface)] border-2 
          ${distance && distance <= 50 ? 'border-[var(--success)]' : 'border-[var(--outline)]'}
          flex items-center justify-center
          shadow-soft-lg
          ${collectible.rarity === 'legendary' ? 'bg-gradient-to-br from-[var(--honey)]/20 to-[var(--pastel-peach)]/20' : ''}
        `}>
          <span className="text-2xl">{icon.emoji}</span>
        </div>

        {/* Индикатор расстояния */}
        {distance !== undefined && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className={`
              text-xs font-medium px-2 py-0.5 rounded-full
              ${distance <= 50 
                ? 'bg-[var(--success)] text-white' 
                : 'bg-[var(--surface-2)] text-[var(--text-secondary)]'
              }
            `}>
              {distance < 1000 ? `${Math.round(distance)}м` : `${(distance / 1000).toFixed(1)}км`}
            </span>
          </div>
        )}

        {/* Значок ценности */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--honey)] flex items-center justify-center shadow-soft">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            {collectible.value}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

