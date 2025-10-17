'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Zap, Gift, Award, CheckCircle2, Circle } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { BoneIcon } from '@/components/icons/DogymorbisIcons'

interface Task {
  id: string
  title: string
  description: string
  icon: string
  reward: number
  progress: number
  total: number
  type: 'daily' | 'weekly' | 'challenge' | 'special'
  completed: boolean
  category: 'walk' | 'social' | 'training' | 'shop' | 'community'
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Утренняя прогулка',
    description: 'Пройдите 2 км сегодня утром',
    icon: '🚶',
    reward: 15,
    progress: 1.2,
    total: 2,
    type: 'daily',
    completed: false,
    category: 'walk',
  },
  {
    id: '2',
    title: 'Социальная активность',
    description: 'Поставьте 5 лайков сегодня',
    icon: '❤️',
    reward: 10,
    progress: 3,
    total: 5,
    type: 'daily',
    completed: false,
    category: 'social',
  },
  {
    id: '3',
    title: 'Делитесь моментами',
    description: 'Опубликуйте пост с фото вашей собаки',
    icon: '📸',
    reward: 20,
    progress: 0,
    total: 1,
    type: 'daily',
    completed: false,
    category: 'social',
  },
  {
    id: '4',
    title: 'Исследователь',
    description: 'Посетите 3 разных парка на этой неделе',
    icon: '🗺️',
    reward: 50,
    progress: 1,
    total: 3,
    type: 'weekly',
    completed: false,
    category: 'walk',
  },
  {
    id: '5',
    title: 'Активная неделя',
    description: 'Пройдите 20 км за неделю',
    icon: '🏃',
    reward: 100,
    progress: 7.5,
    total: 20,
    type: 'weekly',
    completed: false,
    category: 'walk',
  },
  {
    id: '6',
    title: 'Первая покупка',
    description: 'Совершите покупку в магазине',
    icon: '🛒',
    reward: 25,
    progress: 1,
    total: 1,
    type: 'challenge',
    completed: true,
    category: 'shop',
  },
]

const tabs = ['Ежедневные', 'Недельные', 'Челленджи', 'Награды']

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('Ежедневные')
  const [tasks] = useState(mockTasks)

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Ежедневные') return task.type === 'daily'
    if (activeTab === 'Недельные') return task.type === 'weekly'
    if (activeTab === 'Челленджи') return task.type === 'challenge' || task.type === 'special'
    return false
  })

  const totalDailyRewards = tasks.filter(t => t.type === 'daily' && !t.completed).reduce((sum, t) => sum + t.reward, 0)
  const completedToday = tasks.filter(t => t.type === 'daily' && t.completed).length
  const totalDaily = tasks.filter(t => t.type === 'daily').length

  return (
    <div className="flex flex-col h-screen">
      <AppBar title="Задания" />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Progress Card */}
          <Card className="p-6 bg-gradient-to-br from-honey to-warning text-text-primary-dark" elevation={3}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="text-title font-bold">Ежедневный прогресс</h3>
                  <p className="text-body opacity-90">
                    {completedToday} из {totalDaily} заданий выполнено
                  </p>
                </div>
              </div>
              <div className="text-center">
                <BoneIcon size={32} strokeWidth={2.5} />
                <p className="text-caption font-bold mt-1">+{totalDailyRewards}</p>
              </div>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(completedToday / totalDaily) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center" elevation={1}>
              <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center mx-auto mb-2">
                <Target size={20} className="text-sky" />
              </div>
              <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">12</p>
              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">Уровень</p>
            </Card>
            <Card className="p-4 text-center" elevation={1}>
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={20} className="text-success" />
              </div>
              <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">127</p>
              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">Выполнено</p>
            </Card>
            <Card className="p-4 text-center" elevation={1}>
              <div className="w-10 h-10 rounded-full bg-burgundy/20 flex items-center justify-center mx-auto mb-2">
                <Zap size={20} className="text-burgundy" />
              </div>
              <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">5</p>
              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">Серия дней</p>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-3 text-body font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-sky'
                    : 'text-text-secondary-light dark:text-text-secondary-dark'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabTasks"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          {activeTab !== 'Награды' ? (
            <div className="space-y-3">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-4 ${task.completed && 'opacity-60'}`} elevation={2}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-2xl flex-shrink-0">
                        {task.completed ? '✅' : task.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-1 text-honey font-bold">
                            <span>+{task.reward}</span>
                            <BoneIcon size={16} />
                          </div>
                        </div>
                        <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-3">
                          {task.description}
                        </p>
                        {!task.completed && (
                          <>
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">
                                <span>Прогресс</span>
                                <span>{task.progress} / {task.total}</span>
                              </div>
                              <div className="h-2 bg-surface2-light dark:bg-surface2-dark rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-sky"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(task.progress / task.total) * 100}%` }}
                                  transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                            <Button variant="primary" size="sm">
                              {task.progress >= task.total ? 'Забрать награду' : 'Продолжить'}
                            </Button>
                          </>
                        )}
                        {task.completed && (
                          <Chip label="Выполнено" icon={<CheckCircle2 size={14} />} selected />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Rewards Section */
            <div className="space-y-4">
              <Card className="p-6 text-center" elevation={2}>
                <Gift size={48} className="mx-auto mb-3 text-sky" />
                <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Коллекция значков
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  Выполняйте задания и получайте уникальные значки достижений
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {['🏆', '⭐', '💎', '🎯', '🔥', '💪', '🌟', '👑'].map((icon, i) => (
                    <div key={i} className={`p-4 rounded-lg ${i < 5 ? 'bg-honey/20' : 'bg-surface2-light dark:bg-surface2-dark opacity-50'}`}>
                      <div className="text-3xl">{icon}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-burgundy to-danger text-white" elevation={3}>
                <div className="flex items-center gap-4 mb-4">
                  <Award size={40} />
                  <div>
                    <h3 className="text-label font-bold">Премиум награды</h3>
                    <p className="text-body opacity-90">Доступно по подписке</p>
                  </div>
                </div>
                <Button variant="secondary" fullWidth>
                  Оформить подписку
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


