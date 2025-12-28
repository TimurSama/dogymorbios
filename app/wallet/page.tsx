'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Download, TrendingUp, History, Lock, Award } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { BoneIcon, MedallionIcon } from '@/components/icons/DogymorbisIcons'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'income' | 'expense' | 'reward'
  title: string
  amount: number
  currency: 'BoneCoin' | 'USD' | 'RUB'
  date: Date
  icon?: string
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'reward', title: 'Прогулка 3.2 км', amount: 15, currency: 'BoneCoin', date: new Date(), icon: '🚶' },
  { id: '2', type: 'expense', title: 'Покупка в магазине', amount: -50, currency: 'BoneCoin', date: new Date(Date.now() - 3600000), icon: '🛒' },
  { id: '3', type: 'reward', title: 'Задание выполнено', amount: 25, currency: 'BoneCoin', date: new Date(Date.now() - 7200000), icon: '🎯' },
  { id: '4', type: 'income', title: 'Пополнение', amount: 100, currency: 'BoneCoin', date: new Date(Date.now() - 86400000), icon: '💰' },
  { id: '5', type: 'expense', title: 'Стейкинг DAO', amount: -200, currency: 'BoneCoin', date: new Date(Date.now() - 172800000), icon: '🏛️' },
]

const balances = [
  { currency: 'BoneCoin', amount: 1250, icon: '🦴', usdValue: 62.5, change: '+12.5%' },
  { currency: 'USD', amount: 125.50, icon: '💵', change: '+0%' },
  { currency: 'RUB', amount: 11280, icon: '₽', change: '+0%' },
]

const nfts = [
  { id: '1', name: 'Первая прогулка', image: '🏆', rarity: 'Обычный' },
  { id: '2', name: '100 км пройдено', image: '⭐', rarity: 'Редкий' },
  { id: '3', name: 'DAO участник', image: '💎', rarity: 'Эпический' },
]

const tabs = ['Баланс', 'История', 'NFT', 'Стейкинг']

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('Баланс')

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] safe-area-top">
      <AppBar title="Кошелёк" />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Main Balance Card */}
          <Card className="p-6 bg-gradient-to-br from-sky to-info text-white" elevation={3}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BoneIcon size={28} className="text-white" strokeWidth={2.5} />
                <h2 className="text-title font-bold">BoneCoin</h2>
              </div>
              <Lock size={20} className="text-white/80" />
            </div>
            <div className="mb-6">
              <p className="text-caption text-white/80 mb-1">Доступно</p>
              <h1 className="text-display font-bold">1,250 🦴</h1>
              <p className="text-body text-white/90 mt-1">≈ $62.50 USD</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-success" />
              <span className="text-caption font-semibold text-success">+12.5% за 30 дней</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" fullWidth>
                <Send size={18} className="mr-2" />
                Отправить
              </Button>
              <Button variant="secondary" fullWidth>
                <Download size={18} className="mr-2" />
                Получить
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center cursor-pointer" elevation={1} interactive>
              <div className="w-10 h-10 rounded-full bg-honey/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">💸</span>
              </div>
              <p className="text-caption font-medium text-text-primary-light dark:text-text-primary-dark">
                Пополнить
              </p>
            </Card>
            <Card className="p-4 text-center cursor-pointer" elevation={1} interactive>
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">💱</span>
              </div>
              <p className="text-caption font-medium text-text-primary-light dark:text-text-primary-dark">
                Обменять
              </p>
            </Card>
            <Card className="p-4 text-center cursor-pointer" elevation={1} interactive>
              <div className="w-10 h-10 rounded-full bg-burgundy/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🏛️</span>
              </div>
              <p className="text-caption font-medium text-text-primary-light dark:text-text-primary-dark">
                Стейкинг
              </p>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-line-light dark:border-line-dark">
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
                    layoutId="activeTabWallet"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'Баланс' && (
            <div className="space-y-3">
              {balances.map((balance) => (
                <Card key={balance.currency} className="p-4" elevation={1}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-xl">
                        {balance.icon}
                      </div>
                      <div>
                        <p className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {balance.currency}
                        </p>
                        <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          {balance.amount.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {'usdValue' in balance && (
                        <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                          ${balance.usdValue}
                        </p>
                      )}
                      <p className={`text-caption font-medium ${
                        balance.change.startsWith('+') ? 'text-success' : 'text-text-secondary-light dark:text-text-secondary-dark'
                      }`}>
                        {balance.change}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'История' && (
            <div className="space-y-3">
              {mockTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4" elevation={1}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-xl">
                          {tx.icon}
                        </div>
                        <div>
                          <p className="text-body font-medium text-text-primary-light dark:text-text-primary-dark">
                            {tx.title}
                          </p>
                          <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                            {formatDate(tx.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-body font-bold ${
                          tx.amount > 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency === 'BoneCoin' ? '🦴' : tx.currency}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'NFT' && (
            <div className="grid md:grid-cols-3 gap-4">
              {nfts.map((nft) => (
                <Card key={nft.id} className="p-4 text-center" elevation={2} interactive>
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-honey to-burgundy flex items-center justify-center mx-auto mb-3 text-4xl">
                    {nft.image}
                  </div>
                  <h4 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                    {nft.name}
                  </h4>
                  <Chip label={nft.rarity} className="mx-auto" />
                </Card>
              ))}
              <Card className="p-6 flex items-center justify-center border-2 border-dashed border-line-light dark:border-line-dark" elevation={0}>
                <div className="text-center">
                  <Award size={32} className="mx-auto mb-2 text-text-secondary-light dark:text-text-secondary-dark" />
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                    Получайте NFT за достижения
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Стейкинг' && (
            <Card className="p-6" elevation={2}>
              <div className="text-center mb-6">
                <MedallionIcon size={48} className="mx-auto mb-3 text-sky" />
                <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Стейкинг BoneCoin
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                  Заблокируйте BoneCoin и получайте пассивный доход + право голоса в DAO
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-surface2-light dark:bg-surface2-dark rounded-lg">
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">APY</p>
                  <p className="text-label font-bold text-success">12%</p>
                </div>
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">Минимум</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">100 🦴</p>
                </div>
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">Срок</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">30 дней</p>
                </div>
              </div>
              <Button variant="primary" fullWidth size="lg">
                Начать стейкинг
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


