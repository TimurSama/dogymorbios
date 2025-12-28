'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, BookOpen, Award, Target, Clock, TrendingUp, Video, X } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'

interface Exercise {
  id: string
  name: string
  description: string
  category: 'basic' | 'advanced' | 'tricks' | 'socialization' | 'agility'
  difficulty: 1 | 2 | 3 | 4 | 5
  duration: number // в минутах
  videoUrl?: string
  steps: string[]
  tips: string[]
  recommendedBreeds?: string[]
  recommendedAge?: string
}

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Сидеть',
    description: 'Базовая команда для обучения послушанию',
    category: 'basic',
    difficulty: 1,
    duration: 10,
    steps: [
      'Держите лакомство над головой собаки',
      'Медленно двигайте руку назад',
      'Когда собака сядет, скажите "Сидеть"',
      'Дайте лакомство и похвалите',
    ],
    tips: [
      'Тренируйте в спокойной обстановке',
      'Повторяйте 5-10 раз за сессию',
      'Используйте положительное подкрепление',
    ],
    recommendedAge: '2+ месяца',
  },
  {
    id: '2',
    name: 'Лежать',
    description: 'Команда для успокоения и контроля',
    category: 'basic',
    difficulty: 2,
    duration: 15,
    steps: [
      'Начните с команды "Сидеть"',
      'Держите лакомство перед носом',
      'Опустите руку вниз и вперёд',
      'Когда собака ляжет, скажите "Лежать"',
      'Наградите лакомством',
    ],
    tips: [
      'Не давите на собаку',
      'Будьте терпеливы',
      'Тренируйте на мягкой поверхности',
    ],
  },
  {
    id: '3',
    name: 'Дай лапу',
    description: 'Весёлый трюк для взаимодействия',
    category: 'tricks',
    difficulty: 2,
    duration: 15,
    steps: [
      'Сядьте перед собакой',
      'Возьмите лапу в руку',
      'Скажите "Дай лапу"',
      'Дайте лакомство',
      'Повторяйте до автоматизма',
    ],
    tips: [
      'Используйте команду "Сидеть" сначала',
      'Будьте нежны с лапой',
      'Хвалите за каждую попытку',
    ],
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <BookOpen size={14} /> },
  { id: 'basic', label: 'Базовые', icon: <Target size={14} /> },
  { id: 'advanced', label: 'Продвинутые', icon: <TrendingUp size={14} /> },
  { id: 'tricks', label: 'Трюки', icon: <Award size={14} /> },
  { id: 'socialization', label: 'Социализация', icon: <Play size={14} /> },
  { id: 'agility', label: 'Аджилити', icon: <Video size={14} /> },
]

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const filteredExercises = selectedCategory === 'all'
    ? mockExercises
    : mockExercises.filter(e => e.category === selectedCategory)

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] safe-area-top">
      <AppBar title="Тренировки" />

      {/* Категории */}
      <div className="px-4 pt-2 pb-4 border-b border-[var(--outline)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Список упражнений */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredExercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="p-4"
              elevation={1}
              interactive
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-label font-semibold text-[var(--text-primary)] mb-1">
                    {exercise.name}
                  </h3>
                  <p className="text-body text-[var(--text-secondary)] mb-2">
                    {exercise.description}
                  </p>
                  <div className="flex items-center gap-4 text-caption text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{exercise.duration} мин</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={14} />
                      <span>Сложность: {exercise.difficulty}/5</span>
                    </div>
                  </div>
                </div>
                {exercise.videoUrl && (
                  <div className="ml-4 w-16 h-16 rounded-lg bg-[var(--surface-2)] flex items-center justify-center">
                    <Video size={24} className="text-[var(--sky)]" />
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно с деталями упражнения */}
      {selectedExercise && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4 safe-area-top safe-area-bottom"
          onClick={() => setSelectedExercise(null)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg)] rounded-t-3xl md:rounded-3xl"
          >
            <div className="sticky top-0 bg-[var(--bg)] border-b border-[var(--outline)] p-4 flex items-center justify-between">
              <h2 className="text-title font-bold text-[var(--text-primary)]">
                {selectedExercise.name}
              </h2>
              <Button variant="ghost" onClick={() => setSelectedExercise(null)}>
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-body text-[var(--text-secondary)] mb-4">
                  {selectedExercise.description}
                </p>
                <div className="flex gap-4 text-caption text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{selectedExercise.duration} минут</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target size={16} />
                    <span>Сложность: {selectedExercise.difficulty}/5</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-label font-semibold text-[var(--text-primary)] mb-3">
                  Пошаговая инструкция
                </h3>
                <ol className="space-y-3">
                  {selectedExercise.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--sky)] text-white flex items-center justify-center text-caption font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-body text-[var(--text-primary)] flex-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-label font-semibold text-[var(--text-primary)] mb-3">
                  Советы
                </h3>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-[var(--honey)] mt-1">•</span>
                      <span className="text-body text-[var(--text-secondary)] flex-1">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedExercise.recommendedAge && (
                <div className="p-3 rounded-lg bg-[var(--sky)]/10">
                  <p className="text-caption text-[var(--text-secondary)]">
                    Рекомендуемый возраст: {selectedExercise.recommendedAge}
                  </p>
                </div>
              )}

              <Button fullWidth size="lg" variant="honey">
                <Play size={20} className="mr-2" />
                Начать тренировку
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

