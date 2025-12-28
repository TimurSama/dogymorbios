'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Bookmark, Flag, EyeOff, Copy, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PostActionsProps {
  postId: string
  onShare?: () => void
  onSave?: () => void
  onReport?: () => void
  onHide?: () => void
}

export function PostActions({ postId, onShare, onSave, onReport, onHide }: PostActionsProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(url)
    setShowMenu(false)
    // Можно показать toast уведомление
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg state-layer touch-target"
        whileTap={{ scale: 0.95 }}
      >
        <MoreHorizontal size={18} className="text-[var(--text-secondary)]" />
      </motion.button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute top-full right-0 mt-2 w-48 bg-[var(--surface)] border border-[var(--outline)] rounded-lg shadow-soft-lg z-50 overflow-hidden"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  onShare?.()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-body text-[var(--text-primary)] hover:bg-[var(--surface-2)] flex items-center gap-2 touch-target"
              >
                <Share2 size={18} />
                Поделиться
              </button>
              <button
                onClick={() => {
                  handleCopyLink()
                }}
                className="w-full px-4 py-2 text-left text-body text-[var(--text-primary)] hover:bg-[var(--surface-2)] flex items-center gap-2 touch-target"
              >
                <Copy size={18} />
                Копировать ссылку
              </button>
              <button
                onClick={() => {
                  onSave?.()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-body text-[var(--text-primary)] hover:bg-[var(--surface-2)] flex items-center gap-2 touch-target"
              >
                <Bookmark size={18} />
                Сохранить
              </button>
              <div className="border-t border-[var(--outline)] my-1" />
              <button
                onClick={() => {
                  onHide?.()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-body text-[var(--text-primary)] hover:bg-[var(--surface-2)] flex items-center gap-2 touch-target"
              >
                <EyeOff size={18} />
                Скрыть
              </button>
              <button
                onClick={() => {
                  onReport?.()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-body text-[var(--danger)] hover:bg-[var(--surface-2)] flex items-center gap-2 touch-target"
              >
                <Flag size={18} />
                Пожаловаться
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

