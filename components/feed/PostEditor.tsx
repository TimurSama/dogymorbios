'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon, Video, MapPin, Hash, AtSign, Smile } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

interface PostEditorProps {
  onPublish: (post: {
    content: string
    images?: File[]
    video?: File
    location?: { lat: number; lng: number; name: string }
    hashtags?: string[]
    mentions?: string[]
  }) => void
  onCancel: () => void
}

export function PostEditor({ onPublish, onCancel }: PostEditorProps) {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState<File | null>(null)
  const [hashtags, setHashtags] = useState<string[]>([])
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    setImages(prev => [...prev, ...imageFiles].slice(0, 10)) // Максимум 10 фото
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      // Проверка размера (максимум 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('Видео слишком большое. Максимальный размер: 50MB')
        return
      }
      setVideo(file)
      setImages([]) // Видео и фото не могут быть вместе
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = () => {
    setVideo(null)
  }

  const extractHashtags = (text: string): string[] => {
    const hashtagRegex = /#(\w+)/g
    const matches = text.match(hashtagRegex)
    return matches ? matches.map(m => m.substring(1)) : []
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setHashtags(extractHashtags(value))
  }

  const handlePublish = () => {
    if (!content.trim() && images.length === 0 && !video) {
      alert('Добавьте текст, фото или видео')
      return
    }

    onPublish({
      content,
      images: images.length > 0 ? images : undefined,
      video: video || undefined,
      hashtags: hashtags.length > 0 ? hashtags : undefined,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 bg-[var(--bg)] safe-area-top safe-area-bottom"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--outline)]">
          <Button variant="ghost" onClick={onCancel} className="touch-target">
            <X size={20} />
          </Button>
          <h2 className="text-label font-semibold text-[var(--text-primary)]">
            Новый пост
          </h2>
          <Button 
            variant="honey" 
            onClick={handlePublish}
            disabled={!content.trim() && images.length === 0 && !video}
            className="touch-target"
          >
            Опубликовать
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Text editor */}
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Что происходит с вами и вашей собакой?"
            className="w-full min-h-[200px] p-4 rounded-lg bg-[var(--surface)] border border-[var(--outline)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--sky)] focus:ring-opacity-50"
          />

          {/* Media preview */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-2"
              >
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--danger)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity touch-target"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {video && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="w-full rounded-lg"
                />
                <button
                  onClick={removeVideo}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--danger)] text-white flex items-center justify-center touch-target"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hashtags preview */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full bg-[var(--sky)]/20 text-[var(--sky)] text-caption font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="border-t border-[var(--outline)] p-4 safe-area-bottom">
          <div className="flex items-center justify-around">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-1 p-2 rounded-lg state-layer touch-target"
              whileTap={{ scale: 0.95 }}
              disabled={!!video}
            >
              <ImageIcon size={24} className="text-[var(--sky)]" />
              <span className="text-xs text-[var(--text-secondary)]">Фото</span>
            </motion.button>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
            />
            <motion.button
              onClick={() => videoInputRef.current?.click()}
              className="flex flex-col items-center gap-1 p-2 rounded-lg state-layer touch-target"
              whileTap={{ scale: 0.95 }}
              disabled={images.length > 0}
            >
              <Video size={24} className="text-[var(--pastel-lavender)]" />
              <span className="text-xs text-[var(--text-secondary)]">Видео</span>
            </motion.button>

            <motion.button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg state-layer touch-target"
              whileTap={{ scale: 0.95 }}
            >
              <MapPin size={24} className="text-[var(--success)]" />
              <span className="text-xs text-[var(--text-secondary)]">Место</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center gap-1 p-2 rounded-lg state-layer touch-target"
              whileTap={{ scale: 0.95 }}
            >
              <Hash size={24} className="text-[var(--honey)]" />
              <span className="text-xs text-[var(--text-secondary)]">Хэштег</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center gap-1 p-2 rounded-lg state-layer touch-target"
              whileTap={{ scale: 0.95 }}
            >
              <AtSign size={24} className="text-[var(--pastel-peach)]" />
              <span className="text-xs text-[var(--text-secondary)]">Упомянуть</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

