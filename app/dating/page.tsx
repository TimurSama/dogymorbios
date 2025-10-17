'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, SlidersHorizontal, MapPin, Star } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { PawHeartIcon } from '@/components/icons/DogymorbisIcons'

interface DatingProfile {
  id: string
  name: string
  age: number
  location: string
  distance: number
  avatar: string
  dogName: string
  dogBreed: string
  dogAge: number
  dogAvatar: string
  dogPersonality: string[]
  interests: string[]
  bio: string
  matchScore: number
}

const mockProfiles: DatingProfile[] = [
  {
    id: '1',
    name: 'Екатерина',
    age: 28,
    location: 'Москва',
    distance: 1.2,
    avatar: '👩',
    dogName: 'Макс',
    dogBreed: 'Золотистый ретривер',
    dogAge: 4,
    dogAvatar: '🦮',
    dogPersonality: ['Дружелюбный', 'Энергичный', 'Умный'],
    interests: ['Пробежки', 'Аджилити', 'Походы'],
    bio: 'Люблю активный отдых с Максом. Ищем компанию для совместных прогулок и тренировок!',
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Александр',
    age: 32,
    location: 'Москва',
    distance: 2.5,
    avatar: '👨',
    dogName: 'Луна',
    dogBreed: 'Хаски',
    dogAge: 2,
    dogAvatar: '🐺',
    dogPersonality: ['Игривая', 'Общительная', 'Любопытная'],
    interests: ['Парки', 'Игры', 'Фотосессии'],
    bio: 'Луна обожает знакомиться с новыми друзьями. Гуляем каждый день в парке Горького',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Дарья',
    age: 25,
    location: 'Москва',
    distance: 3.8,
    avatar: '👩‍🦰',
    dogName: 'Рокки',
    dogBreed: 'Французский бульдог',
    dogAge: 3,
    dogAvatar: '🐕',
    dogPersonality: ['Спокойный', 'Ласковый'],
    interests: ['Неспешные прогулки', 'Кафе с собаками'],
    bio: 'Рокки предпочитает спокойные прогулки и общение с доброжелательными собаками',
    matchScore: 76,
  },
]

const tabs = ['Свайпы', 'Совпадения', 'Фильтры']

export default function DatingPage() {
  const [activeTab, setActiveTab] = useState('Свайпы')
  const [profiles, setProfiles] = useState(mockProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<DatingProfile[]>([])

  const currentProfile = profiles[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Симуляция совпадения
      if (Math.random() > 0.5) {
        setMatches([...matches, currentProfile])
      }
    }
    setCurrentIndex(currentIndex + 1)
  }

  if (activeTab === 'Свайпы' && currentProfile) {
    return (
      <div className="flex flex-col h-screen">
        <AppBar 
          title="Дейтинг" 
          actions={
            <button 
              onClick={() => setActiveTab('Фильтры')}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              <SlidersHorizontal size={20} />
            </button>
          }
        />

        <div className="flex-1 flex items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProfile.id}
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <Card className="overflow-hidden" elevation={3}>
                  {/* Main Image Placeholder */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-sky/20 to-honey/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{currentProfile.dogAvatar}</div>
                      <div className="text-4xl">{currentProfile.avatar}</div>
                    </div>
                    {/* Match Score */}
                    <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full elevation-2 flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      <span className="text-caption font-bold">{currentProfile.matchScore}%</span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark">
                          {currentProfile.name}, {currentProfile.age}
                        </h2>
                        <h3 className="text-label font-semibold text-sky">
                          {currentProfile.dogName}, {currentProfile.dogAge} {currentProfile.dogAge === 1 ? 'год' : 'года'}
                        </h3>
                        <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                          {currentProfile.dogBreed}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-text-secondary-light dark:text-text-secondary-dark">
                      <MapPin size={16} />
                      <span className="text-body">{currentProfile.location} • {currentProfile.distance} км</span>
                    </div>

                    <p className="text-body text-text-primary-light dark:text-text-primary-dark mb-4">
                      {currentProfile.bio}
                    </p>

                    {/* Dog Personality */}
                    <div className="mb-4">
                      <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-2">
                        Характер собаки
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.dogPersonality.map((trait) => (
                          <Chip key={trait} label={trait} />
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-2">
                        Интересы
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.interests.map((interest) => (
                          <Chip key={interest} label={interest} selected />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <motion.button
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-surface-light dark:bg-surface-dark elevation-2 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={32} className="text-danger" strokeWidth={2.5} />
              </motion.button>

              <motion.button
                onClick={() => handleSwipe('right')}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-burgundy to-danger text-white elevation-3 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PawHeartIcon size={36} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'Совпадения') {
    return (
      <div className="flex flex-col h-screen">
        <AppBar 
          title="Совпадения" 
          showBack
          actions={
            <button onClick={() => setActiveTab('Свайпы')} className="text-sky text-body font-medium">
              Свайпы
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-4">
          {matches.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {matches.map((match) => (
                <Card key={match.id} className="p-4" elevation={2} interactive>
                  <div className="text-center">
                    <div className="relative inline-block mb-3">
                      <div className="w-16 h-16 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-3xl">
                        {match.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-honey border-2 border-white dark:border-surface-dark flex items-center justify-center text-lg">
                        {match.dogAvatar}
                      </div>
                    </div>
                    <h4 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                      {match.name} и {match.dogName}
                    </h4>
                    <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      {match.distance} км от вас
                    </p>
                    <Button variant="primary" size="sm" fullWidth>
                      Написать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <PawHeartIcon size={64} className="text-text-secondary-light dark:text-text-secondary-dark mb-4" />
              <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Пока нет совпадений
              </h3>
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Продолжайте свайпать, чтобы найти идеальных компаньонов для прогулок
              </p>
              <Button variant="primary" onClick={() => setActiveTab('Свайпы')}>
                К свайпам
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeTab === 'Фильтры') {
    return (
      <div className="flex flex-col h-screen">
        <AppBar title="Фильтры" showBack />

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-4 space-y-4">
          <Card className="p-4" elevation={1}>
            <h3 className="text-label font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
              Расстояние
            </h3>
            <input 
              type="range" 
              min="1" 
              max="50" 
              defaultValue="10"
              className="w-full"
            />
            <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mt-2 text-center">
              До 10 км
            </p>
          </Card>

          <Card className="p-4" elevation={1}>
            <h3 className="text-label font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
              Порода собаки
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Любая', 'Овчарка', 'Ретривер', 'Хаски', 'Бульдог'].map(breed => (
                <Chip key={breed} label={breed} selected={breed === 'Любая'} />
              ))}
            </div>
          </Card>

          <Card className="p-4" elevation={1}>
            <h3 className="text-label font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
              Характер собаки
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Энергичный', 'Спокойный', 'Игривый', 'Умный'].map(trait => (
                <Chip key={trait} label={trait} />
              ))}
            </div>
          </Card>

          <Button variant="primary" fullWidth size="lg">
            Применить фильтры
          </Button>
        </div>
      </div>
    )
  }

  return null
}


