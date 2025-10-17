'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, MapPin, Users, Clock, DollarSign, Filter } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { formatDate, formatCurrency } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  icon: string
  date: Date
  location: string
  organizer: string
  participants: number
  maxParticipants?: number
  price: number
  currency: 'BoneCoin' | 'RUB' | 'free'
  category: 'meetup' | 'training' | 'competition' | 'charity' | 'webinar'
  tags: string[]
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Встреча владельцев хаски',
    description: 'Совместная прогулка в Парке Горького. Приглашаем всех владельцев хаски на дружескую встречу!',
    icon: '🐺',
    date: new Date(Date.now() + 86400000 * 2),
    location: 'Парк Горького, главный вход',
    organizer: 'Клуб "Хаски Москва"',
    participants: 24,
    maxParticipants: 50,
    price: 0,
    currency: 'free',
    category: 'meetup',
    tags: ['Хаски', 'Прогулка', 'Москва'],
  },
  {
    id: '2',
    title: 'Мастер-класс по аджилити',
    description: 'Профессиональный тренер научит базовым элементам аджилити. Подходит для собак любых пород',
    icon: '🏃',
    date: new Date(Date.now() + 86400000 * 5),
    location: 'Спорт-клуб "Четыре лапы"',
    organizer: 'Анна Петрова',
    participants: 12,
    maxParticipants: 15,
    price: 50,
    currency: 'BoneCoin',
    category: 'training',
    tags: ['Аджилити', 'Тренировка', 'Спорт'],
  },
  {
    id: '3',
    title: 'Благотворительный забег с собаками',
    description: 'Все средства пойдут на помощь приютам для животных. Забег на 5 км',
    icon: '❤️',
    date: new Date(Date.now() + 86400000 * 10),
    location: 'Сокольники',
    organizer: 'Фонд "Верные друзья"',
    participants: 156,
    price: 500,
    currency: 'RUB',
    category: 'charity',
    tags: ['Благотворительность', 'Забег', 'Приют'],
  },
  {
    id: '4',
    title: 'Онлайн-лекция: Питание собак',
    description: 'Ветеринарный врач расскажет о правильном питании и сбалансированном рационе',
    icon: '🎓',
    date: new Date(Date.now() + 86400000 * 3),
    location: 'Онлайн',
    organizer: 'Ветклиника "Айболит"',
    participants: 89,
    price: 0,
    currency: 'free',
    category: 'webinar',
    tags: ['Ветеринария', 'Питание', 'Онлайн'],
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <Calendar size={14} /> },
  { id: 'meetup', label: 'Встречи', icon: '👥' },
  { id: 'training', label: 'Тренировки', icon: '🏃' },
  { id: 'competition', label: 'Соревнования', icon: '🏆' },
  { id: 'charity', label: 'Благотворительность', icon: '❤️' },
  { id: 'webinar', label: 'Вебинары', icon: '🎓' },
]

const tabs = ['Предстоящие', 'Мои события', 'Прошедшие']

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('Предстоящие')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredEvents = selectedCategory === 'all'
    ? mockEvents
    : mockEvents.filter(event => event.category === selectedCategory)

  const getCurrencyLabel = (price: number, currency: string) => {
    if (currency === 'free') return 'Бесплатно'
    return formatCurrency(price, currency)
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="События" 
        actions={
          <>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
              <Filter size={20} />
            </button>
            <Button variant="ghost" className="!p-2">
              <Plus size={20} />
            </Button>
          </>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-body font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-sky'
                : 'text-text-secondary-light dark:text-text-secondary-dark'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabEvents"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label}
                icon={typeof cat.icon === 'string' ? cat.icon : cat.icon}
                selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden" elevation={2} interactive>
                  <div className="flex flex-col md:flex-row">
                    {/* Icon/Date Section */}
                    <div className="md:w-32 bg-gradient-to-br from-sky/20 to-honey/20 p-6 flex flex-col items-center justify-center text-center">
                      <div className="text-5xl mb-2">{event.icon}</div>
                      <div className="text-caption text-text-primary-light dark:text-text-primary-dark font-semibold">
                        {event.date.getDate()}
                      </div>
                      <div className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                        {event.date.toLocaleDateString('ru-RU', { month: 'short' })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                          {event.title}
                        </h3>
                        <Chip 
                          label={getCurrencyLabel(event.price, event.currency)}
                          className={event.currency === 'free' ? 'bg-success/20 border-success text-success' : ''}
                        />
                      </div>

                      <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-3">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          <Clock size={14} />
                          <span>{formatDate(event.date)} в {event.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          <Users size={14} />
                          <span>
                            {event.participants} участников
                            {event.maxParticipants && ` / ${event.maxParticipants}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button variant="primary" size="sm">
                          Зарегистрироваться
                        </Button>
                        <Button variant="secondary" size="sm">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Create Event CTA */}
          {activeTab === 'Мои события' && (
            <Card className="p-6 text-center border-2 border-dashed border-line-light dark:border-line-dark" elevation={0}>
              <Calendar size={48} className="mx-auto mb-3 text-text-secondary-light dark:text-text-secondary-dark" />
              <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Организуйте своё событие
              </h3>
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Создайте встречу, тренировку или соревнование для сообщества
              </p>
              <Button variant="primary">
                Создать событие
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-20 right-6 md:bottom-6 w-14 h-14 rounded-full bg-success text-white elevation-3 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  )
}


