'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Users, DollarSign, Package, BarChart3, Settings, Plus } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

const stats = {
  revenue: 125000,
  orders: 342,
  views: 15600,
  clicks: 2340,
  conversion: 15.2,
  rating: 4.8,
}

const recentOrders = [
  { id: '1', customer: 'Анна И.', product: 'Премиум корм 3кг', amount: 150, status: 'Доставлен' },
  { id: '2', customer: 'Дмитрий П.', product: 'Поводок-рулетка', amount: 1200, status: 'В пути' },
  { id: '3', customer: 'Мария С.', product: 'Груминг-услуга', amount: 2500, status: 'Ожидает' },
]

const referrals = [
  { id: '1', name: 'Зоомагазин "Лапки"', status: 'Активный', earned: 5000, users: 45 },
  { id: '2', name: 'Ветклиника "Айболит"', status: 'Активный', earned: 3200, users: 28 },
]

const tabs = ['Дашборд', 'Товары', 'Заказы', 'Аналитика', 'Рефералы']

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState('Дашборд')

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Партнёрская программа" 
        actions={
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
            <Settings size={20} />
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-body font-medium transition-colors relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-sky'
                : 'text-text-secondary-light dark:text-text-secondary-dark'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabPartner"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-6xl mx-auto p-4 space-y-4">
          {activeTab === 'Дашборд' && (
            <>
              {/* Welcome Card */}
              <Card className="p-6 bg-gradient-to-br from-sky to-info text-white" elevation={3}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <h2 className="text-title font-bold">Добро пожаловать, Партнёр!</h2>
                    <p className="text-body opacity-90">Вот статистика за последние 30 дней</p>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4" elevation={2}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <DollarSign size={20} className="text-success" />
                    </div>
                    <h3 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Доход
                    </h3>
                  </div>
                  <p className="text-display font-bold text-text-primary-light dark:text-text-primary-dark">
                    {formatCurrency(stats.revenue, 'BoneCoin')}
                  </p>
                  <p className="text-caption text-success mt-1">+12.5% за месяц</p>
                </Card>

                <Card className="p-4" elevation={2}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center">
                      <Package size={20} className="text-sky" />
                    </div>
                    <h3 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Заказы
                    </h3>
                  </div>
                  <p className="text-display font-bold text-text-primary-light dark:text-text-primary-dark">
                    {stats.orders}
                  </p>
                  <p className="text-caption text-success mt-1">+8.3% за месяц</p>
                </Card>

                <Card className="p-4" elevation={2}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-honey/20 flex items-center justify-center">
                      <TrendingUp size={20} className="text-honey" />
                    </div>
                    <h3 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Конверсия
                    </h3>
                  </div>
                  <p className="text-display font-bold text-text-primary-light dark:text-text-primary-dark">
                    {stats.conversion}%
                  </p>
                  <p className="text-caption text-success mt-1">+2.1% за месяц</p>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card className="p-4" elevation={2}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                    Последние заказы
                  </h3>
                  <Button variant="ghost" size="sm">
                    Все заказы
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface2-light dark:bg-surface2-dark"
                    >
                      <div>
                        <p className="text-body font-medium text-text-primary-light dark:text-text-primary-dark">
                          {order.customer}
                        </p>
                        <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          {order.product}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-body font-bold text-text-primary-light dark:text-text-primary-dark">
                          {order.amount} 🦴
                        </p>
                        <p className={`text-caption ${
                          order.status === 'Доставлен' ? 'text-success' :
                          order.status === 'В пути' ? 'text-info' : 'text-warning'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4" elevation={2}>
                  <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                    Производительность
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-body text-text-secondary-light dark:text-text-secondary-dark">Просмотры</span>
                        <span className="text-body font-bold text-text-primary-light dark:text-text-primary-dark">
                          {stats.views.toLocaleString('ru-RU')}
                        </span>
                      </div>
                      <div className="h-2 bg-surface2-light dark:bg-surface2-dark rounded-full overflow-hidden">
                        <div className="h-full bg-sky" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-body text-text-secondary-light dark:text-text-secondary-dark">Клики</span>
                        <span className="text-body font-bold text-text-primary-light dark:text-text-primary-dark">
                          {stats.clicks.toLocaleString('ru-RU')}
                        </span>
                      </div>
                      <div className="h-2 bg-surface2-light dark:bg-surface2-dark rounded-full overflow-hidden">
                        <div className="h-full bg-honey" style={{ width: '45%' }} />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4" elevation={2}>
                  <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                    Рейтинг магазина
                  </h3>
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <p className="text-display font-bold text-honey mb-2">{stats.rating}</p>
                      <div className="flex gap-1 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className="text-honey text-xl">★</span>
                        ))}
                      </div>
                      <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                        На основе 127 отзывов
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'Товары' && (
            <Card className="p-6 text-center" elevation={2}>
              <Package size={64} className="mx-auto mb-4 text-text-secondary-light dark:text-text-secondary-dark" />
              <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Управление товарами
              </h3>
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Добавляйте и редактируйте свои товары и услуги
              </p>
              <Button variant="primary" size="lg">
                <Plus size={20} className="mr-2" />
                Добавить товар
              </Button>
            </Card>
          )}

          {activeTab === 'Рефералы' && (
            <>
              <Card className="p-6 bg-gradient-to-br from-burgundy to-danger text-white" elevation={3}>
                <h3 className="text-title font-bold mb-2">Реферальная программа</h3>
                <p className="text-body opacity-90 mb-4">
                  Приглашайте партнёров и получайте 10% от их дохода
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption opacity-80 mb-1">Приглашено</p>
                    <p className="text-title font-bold">12 партнёров</p>
                  </div>
                  <div>
                    <p className="text-caption opacity-80 mb-1">Заработано</p>
                    <p className="text-title font-bold">8,200 🦴</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                {referrals.map((ref) => (
                  <Card key={ref.id} className="p-4" elevation={2}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                          {ref.name}
                        </h4>
                        <div className="flex items-center gap-3 text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          <span className="text-success">● {ref.status}</span>
                          <span>{ref.users} пользователей</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-label font-bold text-honey">
                          +{ref.earned} 🦴
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 text-center border-2 border-dashed border-line-light dark:border-line-dark" elevation={0}>
                <Users size={48} className="mx-auto mb-3 text-text-secondary-light dark:text-text-secondary-dark" />
                <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Пригласите партнёра
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  Поделитесь своей реферальной ссылкой
                </p>
                <Button variant="primary">
                  Получить ссылку
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


