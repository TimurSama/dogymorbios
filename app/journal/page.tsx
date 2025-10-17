'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Sparkles, ChevronLeft, ChevronRight, Heart, Activity, Utensils, Stethoscope } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { formatDate } from '@/lib/utils'

interface JournalEntry {
  id: string
  date: Date
  type: 'walk' | 'training' | 'feeding' | 'vet' | 'grooming' | 'mood'
  title: string
  description: string
  duration?: number
  distance?: number
  mood?: 'happy' | 'calm' | 'energetic' | 'tired'
  boneCoin?: number
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date(),
    type: 'walk',
    title: 'Утренняя прогулка',
    description: 'Прогулялись в парке, Рекс очень активный сегодня',
    duration: 45,
    distance: 3.2,
    mood: 'energetic',
    boneCoin: 15,
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000),
    type: 'training',
    title: 'Тренировка команд',
    description: 'Работали над командой "рядом", прогресс заметен',
    duration: 30,
    boneCoin: 25,
  },
  {
    id: '3',
    date: new Date(Date.now() - 172800000),
    type: 'vet',
    title: 'Плановый осмотр',
    description: 'Ветеринар сказал, что все отлично. Сделали прививку',
  },
]

const entryTypes = [
  { id: 'all', label: 'Все', icon: <Calendar size={14} /> },
  { id: 'walk', label: 'Прогулки', icon: <Activity size={14} /> },
  { id: 'training', label: 'Тренировки', icon: <Heart size={14} /> },
  { id: 'feeding', label: 'Питание', icon: <Utensils size={14} /> },
  { id: 'vet', label: 'Ветеринар', icon: <Stethoscope size={14} /> },
]

export default function JournalPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showAIRecommendations, setShowAIRecommendations] = useState(true)

  const filteredEntries = selectedType === 'all'
    ? mockEntries
    : mockEntries.filter(entry => entry.type === selectedType)

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'walk': return <Activity size={20} className="text-success" />
      case 'training': return <Heart size={20} className="text-burgundy" />
      case 'feeding': return <Utensils size={20} className="text-honey" />
      case 'vet': return <Stethoscope size={20} className="text-info" />
      default: return <Calendar size={20} className="text-sky" />
    }
  }

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'calm': return '😌'
      case 'energetic': return '🤗'
      case 'tired': return '😴'
      default: return ''
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Журнал" 
        actions={
          <Button variant="ghost" className="!p-2">
            <Plus size={20} />
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* AI Recommendations */}
          {showAIRecommendations && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 bg-gradient-honey relative overflow-hidden" elevation={2}>
                <button
                  onClick={() => setShowAIRecommendations(false)}
                  className="absolute top-2 right-2 text-text-primary-dark hover:opacity-70"
                >
                  ✕
                </button>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                    <Sparkles size={20} className="text-text-primary-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-label font-bold text-text-primary-dark mb-1">
                      AI-рекомендации
                    </h3>
                    <p className="text-body text-text-primary-dark/90 mb-3">
                      На основе анализа ваших записей: Рекс очень активен по утрам. Рекомендуем увеличить длительность утренней прогулки до 60 минут для лучшего баланса энергии.
                    </p>
                    <Button size="sm" variant="secondary">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Calendar Navigation */}
          <Card className="p-4" elevation={1}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-label font-semibold text-text-primary-light dark:text-text-primary-dark">
                {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-1 rounded-lg text-caption font-medium bg-sky text-white"
                >
                  Сегодня
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="text-caption font-medium text-text-secondary-light dark:text-text-secondary-dark py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <button
                  key={i}
                  className={`aspect-square rounded-lg text-caption transition-colors ${
                    i === 15
                      ? 'bg-sky text-white font-bold'
                      : i % 7 === 0 || i % 7 === 6
                      ? 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'
                      : 'text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Card>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {entryTypes.map((type) => (
              <Chip
                key={type.id}
                label={type.label}
                icon={type.icon}
                selected={selectedType === type.id}
                onClick={() => setSelectedType(type.id)}
              />
            ))}
          </div>

          {/* Entries */}
          <div className="space-y-3">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4" elevation={1} interactive>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center flex-shrink-0">
                      {getEntryIcon(entry.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {entry.title}
                        </h4>
                        <span className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-2">
                        {entry.description}
                      </p>
                      <div className="flex items-center gap-4 text-caption">
                        {entry.duration && (
                          <div className="text-text-secondary-light dark:text-text-secondary-dark">
                            ⏱️ {entry.duration} мин
                          </div>
                        )}
                        {entry.distance && (
                          <div className="text-success font-medium">
                            📍 {entry.distance} км
                          </div>
                        )}
                        {entry.mood && (
                          <div className="text-text-secondary-light dark:text-text-secondary-dark">
                            {getMoodEmoji(entry.mood)} {entry.mood}
                          </div>
                        )}
                        {entry.boneCoin && (
                          <div className="ml-auto text-honey font-semibold">
                            +{entry.boneCoin} 🦴
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Subscription Offer */}
          <Card className="p-6 text-center bg-gradient-to-br from-sky/10 to-info/10 border-2 border-sky/30" elevation={2}>
            <Sparkles size={32} className="mx-auto mb-3 text-sky" />
            <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              AI-анализ и рекомендации
            </h3>
            <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Получайте персональные рекомендации по дрессировке, питанию и здоровью вашего питомца на основе данных из журнала
            </p>
            <Button variant="primary" size="lg">
              Оформить подписку — 299₽/мес
            </Button>
          </Card>
        </div>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-20 right-6 md:bottom-6 w-14 h-14 rounded-full bg-burgundy text-white elevation-3 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  )
}


