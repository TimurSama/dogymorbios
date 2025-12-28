'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Image as ImageIcon, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'

export type EntryType = 'walk' | 'training' | 'feeding' | 'vet' | 'grooming' | 'mood' | 'behavior' | 'health' | 'sleep'

interface JournalEntryData {
  type: EntryType
  title: string
  description: string
  date: Date
  
  // Прогулка
  distance?: number
  duration?: number
  location?: string
  
  // Тренировка
  exercise?: string
  difficulty?: number
  progress?: number
  
  // Питание
  foodType?: string
  amount?: number
  appetite?: 'excellent' | 'good' | 'poor' | 'none'
  water?: number
  
  // Настроение
  mood?: number // 1-10
  emotions?: string[]
  moodNotes?: string
  
  // Поведение
  behavior?: {
    aggression?: number // 1-5
    sociability?: number // 1-5
    playfulness?: number // 1-5
    obedience?: number // 1-5
    notes?: string
  }
  
  // Здоровье
  weight?: number
  temperature?: number
  symptoms?: string[]
  medications?: string[]
  
  // Сон
  sleepDuration?: number
  sleepQuality?: 'excellent' | 'good' | 'poor'
  
  // Общее
  photos?: File[]
  boneCoin?: number
}

interface JournalEntryEditorProps {
  entry?: JournalEntryData
  onSave: (data: JournalEntryData) => void
  onCancel: () => void
}

const entryTypes: { id: EntryType; label: string; icon: string }[] = [
  { id: 'walk', label: 'Прогулка', icon: '🚶' },
  { id: 'training', label: 'Тренировка', icon: '🎓' },
  { id: 'feeding', label: 'Питание', icon: '🍖' },
  { id: 'mood', label: 'Настроение', icon: '😊' },
  { id: 'behavior', label: 'Поведение', icon: '🐕' },
  { id: 'health', label: 'Здоровье', icon: '🏥' },
  { id: 'vet', label: 'Ветеринар', icon: '👨‍⚕️' },
  { id: 'grooming', label: 'Груминг', icon: '✂️' },
  { id: 'sleep', label: 'Сон', icon: '😴' },
]

const emotions = ['радость', 'спокойствие', 'возбуждение', 'грусть', 'страх', 'агрессия', 'игривость', 'усталость']

export function JournalEntryEditor({ entry, onSave, onCancel }: JournalEntryEditorProps) {
  const [formData, setFormData] = useState<JournalEntryData>(entry || {
    type: 'walk',
    title: '',
    description: '',
    date: new Date(),
  })

  const updateField = <K extends keyof JournalEntryData>(field: K, value: JournalEntryData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Введите название записи')
      return
    }
    onSave(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4 safe-area-top safe-area-bottom"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg)] rounded-t-3xl md:rounded-3xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg)] border-b border-[var(--outline)] p-4 flex items-center justify-between">
          <h2 className="text-title font-bold text-[var(--text-primary)]">
            {entry ? 'Редактировать запись' : 'Новая запись'}
          </h2>
          <Button variant="ghost" onClick={onCancel} className="touch-target">
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Тип записи */}
          <div>
            <label className="text-label font-semibold text-[var(--text-primary)] mb-3 block">
              Тип записи
            </label>
            <div className="grid grid-cols-3 gap-2">
              {entryTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateField('type', type.id)}
                  className={`
                    p-3 rounded-lg border-2 transition-all touch-target
                    ${formData.type === type.id
                      ? 'border-[var(--sky)] bg-[var(--sky)]/10'
                      : 'border-[var(--outline)] hover:border-[var(--sky)]/50'
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-caption font-medium text-[var(--text-primary)]">
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Основные поля */}
          <Input
            label="Название"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Например: Утренняя прогулка"
          />

          <div>
            <label className="text-label font-semibold text-[var(--text-primary)] mb-2 block">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Опишите событие..."
              className="w-full min-h-[100px] p-4 rounded-lg bg-[var(--surface)] border border-[var(--outline)] text-[var(--text-primary)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--sky)]"
            />
          </div>

          {/* Специфичные поля в зависимости от типа */}
          <AnimatePresence mode="wait">
            {formData.type === 'walk' && (
              <motion.div
                key="walk"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Input
                  label="Расстояние (км)"
                  type="number"
                  value={formData.distance?.toString() || ''}
                  onChange={(e) => updateField('distance', parseFloat(e.target.value) || undefined)}
                  placeholder="0"
                />
                <Input
                  label="Длительность (минуты)"
                  type="number"
                  value={formData.duration?.toString() || ''}
                  onChange={(e) => updateField('duration', parseInt(e.target.value) || undefined)}
                  placeholder="0"
                />
                <Input
                  label="Место"
                  value={formData.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Парк Горького"
                />
              </motion.div>
            )}

            {formData.type === 'mood' && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-label font-semibold text-[var(--text-primary)] mb-3 block">
                    Настроение: {formData.mood || 5}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.mood || 5}
                    onChange={(e) => updateField('mood', parseInt(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-2)] rounded-lg appearance-none cursor-pointer accent-[var(--sky)]"
                  />
                  <div className="flex justify-between text-caption text-[var(--text-secondary)] mt-1">
                    <span>😢</span>
                    <span>😐</span>
                    <span>😊</span>
                  </div>
                </div>
                <div>
                  <label className="text-label font-semibold text-[var(--text-primary)] mb-2 block">
                    Эмоции
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion) => (
                      <Chip
                        key={emotion}
                        label={emotion}
                        selected={formData.emotions?.includes(emotion)}
                        onClick={() => {
                          const current = formData.emotions || []
                          const updated = current.includes(emotion)
                            ? current.filter(e => e !== emotion)
                            : [...current, emotion]
                          updateField('emotions', updated)
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {formData.type === 'feeding' && (
              <motion.div
                key="feeding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Input
                  label="Тип корма"
                  value={formData.foodType || ''}
                  onChange={(e) => updateField('foodType', e.target.value)}
                  placeholder="Сухой корм, консервы..."
                />
                <Input
                  label="Количество (г)"
                  type="number"
                  value={formData.amount?.toString() || ''}
                  onChange={(e) => updateField('amount', parseFloat(e.target.value) || undefined)}
                  placeholder="200"
                />
                <div>
                  <label className="text-label font-semibold text-[var(--text-primary)] mb-2 block">
                    Аппетит
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['excellent', 'good', 'poor', 'none'] as const).map((appetite) => (
                      <button
                        key={appetite}
                        onClick={() => updateField('appetite', appetite)}
                        className={`
                          p-3 rounded-lg border-2 transition-all touch-target
                          ${formData.appetite === appetite
                            ? 'border-[var(--success)] bg-[var(--success)]/10'
                            : 'border-[var(--outline)]'
                          }
                        `}
                      >
                        <div className="text-2xl mb-1">
                          {appetite === 'excellent' ? '😋' : appetite === 'good' ? '😊' : appetite === 'poor' ? '😐' : '😞'}
                        </div>
                        <div className="text-caption text-[var(--text-primary)]">
                          {appetite === 'excellent' ? 'Отличный' : appetite === 'good' ? 'Хороший' : appetite === 'poor' ? 'Плохой' : 'Нет'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {formData.type === 'behavior' && (
              <motion.div
                key="behavior"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {(['aggression', 'sociability', 'playfulness', 'obedience'] as const).map((field) => (
                  <div key={field}>
                    <label className="text-label font-semibold text-[var(--text-primary)] mb-2 block">
                      {field === 'aggression' ? 'Агрессивность' : 
                       field === 'sociability' ? 'Социальность' :
                       field === 'playfulness' ? 'Игривость' : 'Послушание'}: {formData.behavior?.[field] || 3}/5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.behavior?.[field] || 3}
                      onChange={(e) => updateField('behavior', {
                        ...formData.behavior,
                        [field]: parseInt(e.target.value),
                      })}
                      className="w-full h-2 bg-[var(--surface-2)] rounded-lg appearance-none cursor-pointer accent-[var(--sky)]"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-label font-semibold text-[var(--text-primary)] mb-2 block">
                    Заметки о поведении
                  </label>
                  <textarea
                    value={formData.behavior?.notes || ''}
                    onChange={(e) => updateField('behavior', {
                      ...formData.behavior,
                      notes: e.target.value,
                    })}
                    placeholder="Опишите поведение..."
                    className="w-full min-h-[80px] p-4 rounded-lg bg-[var(--surface)] border border-[var(--outline)] text-[var(--text-primary)] resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4 border-t border-[var(--outline)]">
            <Button variant="ghost" onClick={onCancel} className="flex-1">
              Отмена
            </Button>
            <Button variant="honey" onClick={handleSave} className="flex-1">
              <Save size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

