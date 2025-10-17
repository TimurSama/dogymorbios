'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Vote, TrendingUp, Users, DollarSign, Plus, ThumbsUp, ThumbsDown, Clock } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Proposal {
  id: string
  title: string
  description: string
  author: string
  category: 'development' | 'marketing' | 'charity' | 'event' | 'governance'
  status: 'active' | 'passed' | 'rejected' | 'pending'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  budget: number
  deadline: Date
  userVoted: boolean | null
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Интеграция с GPS-трекерами для собак',
    description: 'Предлагаю добавить поддержку популярных GPS-трекеров для автоматического отслеживания прогулок',
    author: 'Александр К.',
    category: 'development',
    status: 'active',
    votesFor: 342,
    votesAgainst: 45,
    totalVotes: 387,
    quorum: 500,
    budget: 50000,
    deadline: new Date(Date.now() + 86400000 * 7),
    userVoted: null,
  },
  {
    id: '2',
    title: 'Благотворительная акция для приютов',
    description: 'Выделить 100,000 BoneCoin на помощь приютам для животных в 10 городах России',
    author: 'Мария П.',
    category: 'charity',
    status: 'active',
    votesFor: 567,
    votesAgainst: 23,
    totalVotes: 590,
    quorum: 500,
    budget: 100000,
    deadline: new Date(Date.now() + 86400000 * 3),
    userVoted: true,
  },
  {
    id: '3',
    title: 'Ежегодный фестиваль Dogymorbis',
    description: 'Организация масштабного фестиваля для владельцев собак с соревнованиями, мастер-классами и выставкой',
    author: 'Дмитрий С.',
    category: 'event',
    status: 'passed',
    votesFor: 892,
    votesAgainst: 108,
    totalVotes: 1000,
    quorum: 500,
    budget: 200000,
    deadline: new Date(Date.now() - 86400000 * 2),
    userVoted: true,
  },
]

const treasury = {
  total: 5000000,
  allocated: 350000,
  available: 4650000,
  holders: 12458,
}

const tabs = ['Голосования', 'Бюджет', 'Стейкинг', 'История']

export default function DaoPage() {
  const [activeTab, setActiveTab] = useState('Голосования')

  const handleVote = (proposalId: string, vote: boolean) => {
    console.log(`Voted ${vote ? 'for' : 'against'} proposal ${proposalId}`)
  }

  const getCategoryLabel = (category: string) => {
    const labels: {[key: string]: string} = {
      development: 'Разработка',
      marketing: 'Маркетинг',
      charity: 'Благотворительность',
      event: 'Мероприятие',
      governance: 'Управление',
    }
    return labels[category] || category
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-sky/20 text-sky border-sky'
      case 'passed': return 'bg-success/20 text-success border-success'
      case 'rejected': return 'bg-danger/20 text-danger border-danger'
      case 'pending': return 'bg-warning/20 text-warning border-warning'
      default: return ''
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="DAO Управление" 
        actions={
          <Button variant="ghost" className="!p-2">
            <Plus size={20} />
          </Button>
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
                layoutId="activeTabDao"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {activeTab === 'Голосования' && (
            <>
              {/* Info Card */}
              <Card className="p-6 bg-gradient-to-br from-sky to-info text-white" elevation={3}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                    <Vote size={32} />
                  </div>
                  <div>
                    <h2 className="text-title font-bold">Децентрализованное управление</h2>
                    <p className="text-body opacity-90">
                      Участвуйте в голосованиях и влияйте на развитие экосистемы
                    </p>
                  </div>
                </div>
              </Card>

              {/* Proposals */}
              <div className="space-y-4">
                {mockProposals.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6" elevation={2}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Chip 
                              label={getCategoryLabel(proposal.category)} 
                            />
                            <Chip 
                              label={proposal.status === 'active' ? 'Активно' : 
                                    proposal.status === 'passed' ? 'Принято' :
                                    proposal.status === 'rejected' ? 'Отклонено' : 'Ожидает'}
                              className={getStatusColor(proposal.status)}
                            />
                          </div>
                          <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                            {proposal.title}
                          </h3>
                          <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-3">
                            {proposal.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-caption text-text-secondary-light dark:text-text-secondary-dark mb-4">
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>Автор: {proposal.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign size={14} />
                              <span>Бюджет: {formatCurrency(proposal.budget, 'BoneCoin')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>До: {formatDate(proposal.deadline)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voting Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-caption mb-2">
                          <span className="text-success font-semibold">За: {proposal.votesFor}</span>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark">
                            {proposal.totalVotes} / {proposal.quorum} голосов
                          </span>
                          <span className="text-danger font-semibold">Против: {proposal.votesAgainst}</span>
                        </div>
                        <div className="h-3 bg-surface2-light dark:bg-surface2-dark rounded-full overflow-hidden flex">
                          <div 
                            className="bg-success"
                            style={{ width: `${(proposal.votesFor / proposal.quorum) * 100}%` }}
                          />
                          <div 
                            className="bg-danger"
                            style={{ width: `${(proposal.votesAgainst / proposal.quorum) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Vote Buttons */}
                      {proposal.status === 'active' && !proposal.userVoted && (
                        <div className="flex gap-3">
                          <Button 
                            variant="primary" 
                            className="flex-1 bg-success hover:bg-success/90"
                            onClick={() => handleVote(proposal.id, true)}
                          >
                            <ThumbsUp size={18} className="mr-2" />
                            Поддержать
                          </Button>
                          <Button 
                            variant="danger" 
                            className="flex-1"
                            onClick={() => handleVote(proposal.id, false)}
                          >
                            <ThumbsDown size={18} className="mr-2" />
                            Против
                          </Button>
                        </div>
                      )}
                      {proposal.userVoted !== null && (
                        <div className="text-center py-2 text-body font-medium text-text-secondary-light dark:text-text-secondary-dark">
                          Вы проголосовали {proposal.userVoted ? '«За»' : '«Против»'}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Create Proposal CTA */}
              <Card className="p-6 text-center border-2 border-dashed border-line-light dark:border-line-dark" elevation={0}>
                <Vote size={48} className="mx-auto mb-3 text-text-secondary-light dark:text-text-secondary-dark" />
                <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Создайте предложение
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  Требуется минимум 1,000 BoneCoin в стейкинге
                </p>
                <Button variant="primary">
                  Создать предложение
                </Button>
              </Card>
            </>
          )}

          {activeTab === 'Бюджет' && (
            <>
              <Card className="p-6 bg-gradient-to-br from-honey to-warning text-text-primary-dark" elevation={3}>
                <h3 className="text-title font-bold mb-4">Казна DAO</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption opacity-80 mb-1">Всего средств</p>
                    <p className="text-title font-bold">{formatCurrency(treasury.total, 'BoneCoin')}</p>
                  </div>
                  <div>
                    <p className="text-caption opacity-80 mb-1">Доступно</p>
                    <p className="text-title font-bold">{formatCurrency(treasury.available, 'BoneCoin')}</p>
                  </div>
                  <div>
                    <p className="text-caption opacity-80 mb-1">Выделено</p>
                    <p className="text-title font-bold">{formatCurrency(treasury.allocated, 'BoneCoin')}</p>
                  </div>
                  <div>
                    <p className="text-caption opacity-80 mb-1">Держатели</p>
                    <p className="text-title font-bold">{treasury.holders.toLocaleString('ru-RU')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6" elevation={2}>
                <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Распределение бюджета
                </h3>
                <div className="space-y-3">
                  {[
                    { category: 'Разработка', amount: 150000, percent: 43 },
                    { category: 'Благотворительность', amount: 100000, percent: 29 },
                    { category: 'Мероприятия', amount: 70000, percent: 20 },
                    { category: 'Маркетинг', amount: 30000, percent: 8 },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                          {item.category}
                        </span>
                        <span className="text-body font-bold text-text-primary-light dark:text-text-primary-dark">
                          {formatCurrency(item.amount, 'BoneCoin')}
                        </span>
                      </div>
                      <div className="h-2 bg-surface2-light dark:bg-surface2-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activeTab === 'Стейкинг' && (
            <Card className="p-6" elevation={2}>
              <div className="text-center mb-6">
                <TrendingUp size={48} className="mx-auto mb-3 text-sky" />
                <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Стейкинг BoneCoin для DAO
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                  Заблокируйте BoneCoin, чтобы получить право голоса и участвовать в управлении
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-surface2-light dark:bg-surface2-dark rounded-lg">
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">APY</p>
                  <p className="text-label font-bold text-success">8%</p>
                </div>
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">Минимум</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">500 🦴</p>
                </div>
                <div className="text-center">
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-1">Право голоса</p>
                  <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">1:1</p>
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


