'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Map, Users, Heart, BookOpen, ShoppingBag, Calendar,
  TrendingUp, Award, Zap, Activity, BoneIcon as BoneIconLucide
} from 'lucide-react'
import { DoghouseIcon, BoneIcon, PawHeartIcon } from '@/components/icons/DogymorbisIcons'
import { BoneCoin } from '@/components/ui/BoneCoin'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Дашборд для авторизованных пользователей
 * Главный экран после входа
 */
export default function DashboardPage() {
  const router = useRouter()

  // Mock данные
  const stats = {
    bones: 1250,
    walks: 12,
    friends: 8,
    achievements: 5
  }

  const recentActivity = [
    { type: 'walk', text: 'Завершена прогулка 2.5 км', time: '2 часа назад', icon: Map },
    { type: 'bone', text: 'Получено 50 косточек', time: '3 часа назад', icon: BoneIcon },
    { type: 'friend', text: 'Новый друг: Макс', time: 'Вчера', icon: Users },
    { type: 'achievement', text: 'Достижение: Первая прогулка', time: '2 дня назад', icon: Award },
  ]

  const quickActions = [
    { label: 'Начать прогулку', path: '/map', icon: Map, color: 'plush-primary' },
    { label: 'Лента', path: '/feed', icon: Users, color: 'plush-sky' },
    { label: 'Дейтинг', path: '/dating', icon: Heart, color: 'plush-alert' },
    { label: 'Журнал', path: '/journal', icon: BookOpen, color: 'plush-sky' },
    { label: 'Магазин', path: '/store', icon: ShoppingBag, color: 'plush-yellow' },
    { label: 'События', path: '/events', icon: Calendar, color: 'plush-primary' },
  ]

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Главная" />

      <div className="px-4 py-6 space-y-6">
        {/* Приветствие */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-plush-graphite mb-2">
            Привет! 👋
          </h1>
          <p className="text-plush-graphite/70">
            Готовы к новой прогулке?
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Косточки', value: stats.bones, icon: BoneIcon, color: 'plush-yellow', isBone: true },
            { label: 'Прогулки', value: stats.walks, icon: Map, color: 'plush-primary' },
            { label: 'Друзья', value: stats.friends, icon: Users, color: 'plush-sky' },
            { label: 'Достижения', value: stats.achievements, icon: Award, color: 'plush-alert' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <SoftCard depth={1} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-plush-graphite/60 mb-1">{stat.label}</p>
                    {stat.isBone ? (
                      <BoneCoin amount={stat.value} size="lg" animated />
                    ) : (
                      <p className="text-2xl font-bold text-plush-graphite">{stat.value}</p>
                    )}
                  </div>
                  <stat.icon size={32} className={`text-${stat.color}`} />
                </div>
              </SoftCard>
            </motion.div>
          ))}
        </div>

        {/* Быстрые действия */}
        <div>
          <h2 className="text-xl font-semibold text-plush-graphite mb-4">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                onClick={() => router.push(action.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <SoftCard depth={1} interactive hover className="p-4 text-center">
                  <action.icon size={32} className={`mx-auto mb-2 text-${action.color}`} />
                  <p className="text-xs font-medium text-plush-graphite">
                    {action.label}
                  </p>
                </SoftCard>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Главная CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <SoftCard depth={2} className="p-6 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                  Начните прогулку
                </h3>
                <p className="text-plush-graphite/70 text-sm mb-4">
                  Собирайте косточки и выполняйте задания
                </p>
                <SoftButton 
                  variant="primary" 
                  size="md"
                  onClick={() => router.push('/map')}
                >
                  Начать прогулку
                </SoftButton>
              </div>
              <Map size={64} className="text-plush-primary/30" />
            </div>
          </SoftCard>
        </motion.div>

        {/* Недавняя активность */}
        <div>
          <h2 className="text-xl font-semibold text-plush-graphite mb-4">
            Недавняя активность
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-plush-primary/10 flex items-center justify-center">
                      <activity.icon size={20} className="text-plush-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-plush-graphite font-medium">{activity.text}</p>
                      <p className="text-sm text-plush-graphite/60">{activity.time}</p>
                    </div>
                  </div>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ежедневные задания */}
        <div>
          <h2 className="text-xl font-semibold text-plush-graphite mb-4">
            Ежедневные задания
          </h2>
          <SoftCard depth={1} className="p-6">
            <div className="space-y-4">
              {[
                { task: 'Прогулка 30 минут', progress: 75, reward: 50 },
                { task: 'Собрать 3 приза', progress: 66, reward: 30 },
                { task: 'Опубликовать пост', progress: 0, reward: 20 },
              ].map((task, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-plush-graphite font-medium">{task.task}</span>
                    <span className="text-plush-yellow font-semibold">+{task.reward} 🦴</span>
                  </div>
                  <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-plush-primary h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
