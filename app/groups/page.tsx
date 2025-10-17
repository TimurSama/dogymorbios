'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Users, TrendingUp, MapPin, Lock } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip } from '@/components/ui/Chip'

interface Group {
  id: string
  name: string
  description: string
  icon: string
  members: number
  isPrivate: boolean
  category: 'breed' | 'location' | 'activity' | 'professional'
  tags: string[]
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Владельцы хаски Москва',
    description: 'Сообщество владельцев хаски. Организуем совместные прогулки, обмениваемся опытом',
    icon: '🐺',
    members: 342,
    isPrivate: false,
    category: 'breed',
    tags: ['Хаски', 'Москва', 'Прогулки'],
  },
  {
    id: '2',
    name: 'Аджилити для всех',
    description: 'Тренировки по аджилити для собак любых пород и возрастов',
    icon: '🏃',
    members: 156,
    isPrivate: false,
    category: 'activity',
    tags: ['Аджилити', 'Спорт', 'Тренировки'],
  },
  {
    id: '3',
    name: 'Собаки Парка Горького',
    description: 'Местное сообщество для тех, кто гуляет в Парке Горького',
    icon: '🌳',
    members: 428,
    isPrivate: false,
    category: 'location',
    tags: ['Парк Горького', 'Москва'],
  },
  {
    id: '4',
    name: 'Профессиональные кинологи',
    description: 'Закрытое сообщество для сертифицированных кинологов',
    icon: '🎓',
    members: 89,
    isPrivate: true,
    category: 'professional',
    tags: ['Кинология', 'Профи'],
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <Users size={14} /> },
  { id: 'breed', label: 'По породам', icon: '🐕' },
  { id: 'location', label: 'Локальные', icon: <MapPin size={14} /> },
  { id: 'activity', label: 'Активности', icon: <TrendingUp size={14} /> },
  { id: 'professional', label: 'Профи', icon: '🎓' },
]

const tabs = ['Мои группы', 'Рекомендации', 'Поиск']

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState('Рекомендации')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [myGroups] = useState([mockGroups[0], mockGroups[2]])

  const filteredGroups = mockGroups.filter(group => {
    const matchCategory = selectedCategory === 'all' || group.category === selectedCategory
    const matchSearch = searchQuery === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Группы" 
        actions={
          <Button variant="ghost" className="!p-2">
            <Plus size={20} />
          </Button>
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
                layoutId="activeTabGroups"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Search & Filters */}
          {activeTab !== 'Мои группы' && (
            <>
              <Input
                placeholder="Поиск групп..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
              />

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
            </>
          )}

          {/* Groups List */}
          <div className="space-y-3">
            {(activeTab === 'Мои группы' ? myGroups : filteredGroups).map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4" elevation={2} interactive>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-sky/20 to-honey/20 flex items-center justify-center text-3xl flex-shrink-0">
                      {group.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                              {group.name}
                            </h3>
                            {group.isPrivate && (
                              <Lock size={14} className="text-text-secondary-light dark:text-text-secondary-dark" />
                            )}
                          </div>
                          <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-2">
                            {group.members.toLocaleString('ru-RU')} участников
                          </p>
                        </div>
                      </div>
                      <p className="text-body text-text-primary-light dark:text-text-primary-dark mb-3">
                        {group.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {group.tags.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>
                      <Button 
                        variant={activeTab === 'Мои группы' ? 'secondary' : 'primary'} 
                        size="sm"
                      >
                        {activeTab === 'Мои группы' ? 'Открыть' : 'Вступить'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Create Group CTA */}
          {activeTab === 'Мои группы' && (
            <Card className="p-6 text-center border-2 border-dashed border-line-light dark:border-line-dark" elevation={0}>
              <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-3">
                <Plus size={24} className="text-sky" />
              </div>
              <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Создайте свою группу
              </h3>
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Объедините владельцев собак по интересам, породе или локации
              </p>
              <Button variant="primary">
                Создать группу
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


