'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, Gamepad2, Droplet, TrendingUp, DollarSign, 
  Target, Calendar, Users, Zap, ArrowRight, Lock
} from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { WhitepaperPopup } from '@/components/whitepaper/WhitepaperPopup'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * ProjectHub - Центр исследований и разработок
 * Карточки проектов с детальной информацией
 */
export default function ProjectHubPage() {
  const [openProject, setOpenProject] = useState<string | null>(null)

  const projects = [
    {
      id: 'smart-collar',
      title: 'Смарт ошейник',
      icon: <Cpu size={48} />,
      category: 'Hardware',
      status: 'research',
      description: 'Ошейник с системой мониторинга и сбора информации о жизненных показателях и активности питомца',
      features: [
        'Мониторинг давления, пульса, дыхания',
        'Отслеживание движений (ходьба, бег, игры, тренировки)',
        'Анализ сна',
        'GPS и NFC технологии',
        'Синхронизация с приложением',
      ],
      market: {
        size: '$2.5B',
        growth: '+15%',
        description: 'Рынок умных устройств для домашних животных растёт на 15% ежегодно',
      },
      investment: {
        research: 500000,
        prototype: 1200000,
        production: 5000000,
        total: 6700000,
        current: 250000,
        progress: 3.7,
      },
      timeline: {
        research: '6 месяцев',
        prototype: '12 месяцев',
        production: '18 месяцев',
        total: '36 месяцев',
      },
      investors: 45,
      documents: [
        'Техническое задание',
        'Схема электроники',
        'Чертежи корпуса',
        'Исследование рынка',
        'Бизнес-план',
      ],
    },
    {
      id: 'smart-toys',
      title: 'Смарт игрушки',
      icon: <Gamepad2 size={48} />,
      category: 'Hardware',
      status: 'research',
      description: 'Игрушки и тренажёры с настраиваемыми режимами включения, реакций и игр с камерами и удалённым подключением',
      features: [
        'Убегающий мячик с автономным управлением',
        'Настенная веревка-тягалка с датчиками силы',
        'Беговая дорожка для людей и животных',
        'Настраиваемый наклон и поощрения',
        'Камеры для наблюдения и удалённого управления',
        'Автоматическое выключение на ночь',
      ],
      market: {
        size: '$1.8B',
        growth: '+12%',
        description: 'Рынок интерактивных игрушек для животных показывает стабильный рост',
      },
      investment: {
        research: 300000,
        prototype: 800000,
        production: 3500000,
        total: 4600000,
        current: 120000,
        progress: 2.6,
      },
      timeline: {
        research: '4 месяца',
        prototype: '10 месяцев',
        production: '16 месяцев',
        total: '30 месяцев',
      },
      investors: 32,
      documents: [
        'Концепция продуктов',
        'Технические схемы',
        '3D-модели',
        'Маркетинговое исследование',
      ],
    },
    {
      id: 'smart-accessories',
      title: 'Смарт аксессуары',
      icon: <Droplet size={48} />,
      category: 'Hardware',
      status: 'research',
      description: 'Поилки, кормушки с синхронизацией с приложением для оптимального расчета порций и времени приема пищи',
      features: [
        'Умная кормушка с расчетом порций',
        'Синхронизация с другими источниками питания',
        'Интерактивный коврик с препятствиями',
        'Увеличение времени приёма пищи',
        'Развитие обоняния и поиска',
        'Мониторинг потребления воды',
      ],
      market: {
        size: '$1.2B',
        growth: '+18%',
        description: 'Рынок автоматизированных аксессуаров для ухода за питомцами',
      },
      investment: {
        research: 200000,
        prototype: 600000,
        production: 2800000,
        total: 3600000,
        current: 80000,
        progress: 2.2,
      },
      timeline: {
        research: '3 месяца',
        prototype: '8 месяцев',
        production: '14 месяцев',
        total: '25 месяцев',
      },
      investors: 28,
      documents: [
        'Техническая документация',
        'Схемы механизмов',
        'Прототипы',
        'Тестирование материалов',
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'research': return 'text-plush-yellow'
      case 'prototype': return 'text-plush-primary'
      case 'production': return 'text-plush-sky'
      default: return 'text-plush-graphite/60'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'research': return 'Исследование'
      case 'prototype': return 'Прототип'
      case 'production': return 'Производство'
      default: return 'Завершено'
    }
  }

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="ProjectHub" />

      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              ProjectHub
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Центр исследований и разработок Dogymorbis
            </p>
            <p className="text-plush-graphite/60 max-w-2xl mx-auto">
              Инвестируйте в инновационные проекты через токен-стейкинг и участвуйте в развитии экосистемы
            </p>
          </motion.div>

          {/* Статистика */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Проектов', value: projects.length, icon: Target },
              { label: 'Инвесторов', value: projects.reduce((sum, p) => sum + p.investors, 0), icon: Users },
              { label: 'Собрано', value: '$450K', icon: DollarSign },
              { label: 'Нужно', value: '$14.9M', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-6 text-center">
                  <stat.icon size={32} className="mx-auto mb-3 text-plush-primary" />
                  <p className="text-2xl font-bold text-plush-graphite mb-1">{stat.value}</p>
                  <p className="text-sm text-plush-graphite/60">{stat.label}</p>
                </SoftCard>
              </motion.div>
            ))}
          </div>

          {/* Проекты */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SoftCard
                  depth={1}
                  interactive
                  hover
                  className="p-6 h-full cursor-pointer"
                  onClick={() => setOpenProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-plush-primary">{project.icon}</div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-plush-cream-pressed ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-plush-graphite/70 mb-4">
                    {project.description}
                  </p>

                  {/* Прогресс инвестиций */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-plush-graphite/60">Собрано</span>
                      <span className="font-semibold text-plush-primary">
                        ${(project.investment.current / 1000).toFixed(0)}K / ${(project.investment.total / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.investment.progress}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-plush-primary h-2 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Быстрая информация */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <p className="text-plush-graphite/60">Рынок</p>
                      <p className="font-semibold text-plush-graphite">{project.market.size}</p>
                    </div>
                    <div>
                      <p className="text-plush-graphite/60">Инвесторов</p>
                      <p className="font-semibold text-plush-graphite">{project.investors}</p>
                    </div>
                  </div>

                  <SoftButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenProject(project.id)
                    }}
                    className="w-full"
                  >
                    Подробнее
                    <ArrowRight size={16} className="ml-2" />
                  </SoftButton>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Попапы проектов */}
      {projects.map((project) => (
        <ProjectPopup
          key={project.id}
          project={project}
          isOpen={openProject === project.id}
          onClose={() => setOpenProject(null)}
        />
      ))}
    </div>
  )
}

function ProjectPopup({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) {
  return (
    <WhitepaperPopup
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      icon={project.icon}
      content={
        <div className="space-y-6">
          {/* Описание */}
          <div>
            <h3 className="text-xl font-semibold text-plush-graphite mb-3">Описание проекта</h3>
            <p className="text-plush-graphite/70">{project.description}</p>
          </div>

          {/* Функции */}
          <div>
            <h3 className="text-xl font-semibold text-plush-graphite mb-3">Основные функции</h3>
            <ul className="space-y-2">
              {project.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-plush-graphite/70">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Рынок */}
          <SoftCard depth={1} className="p-6">
            <h3 className="text-xl font-semibold text-plush-graphite mb-4">Анализ рынка</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-plush-graphite/60 mb-1">Размер рынка</p>
                <p className="text-2xl font-bold text-plush-primary">{project.market.size}</p>
              </div>
              <div>
                <p className="text-sm text-plush-graphite/60 mb-1">Рост</p>
                <p className="text-2xl font-bold text-plush-sky">{project.market.growth}</p>
              </div>
              <div>
                <p className="text-sm text-plush-graphite/60">{project.market.description}</p>
              </div>
            </div>
          </SoftCard>

          {/* Инвестиции */}
          <SoftCard depth={1} className="p-6">
            <h3 className="text-xl font-semibold text-plush-graphite mb-4">Инвестиционный план</h3>
            <div className="space-y-4">
              {[
                { label: 'Исследование', amount: project.investment.research },
                { label: 'Прототип', amount: project.investment.prototype },
                { label: 'Производство', amount: project.investment.production },
              ].map((stage, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-plush-graphite/70">{stage.label}</span>
                    <span className="font-semibold text-plush-graphite">
                      ${(stage.amount / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                    <div
                      className="bg-plush-primary h-2 rounded-full"
                      style={{ width: `${(stage.amount / project.investment.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-plush-graphite/10">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-plush-graphite">Всего требуется</span>
                  <span className="text-2xl font-bold text-plush-primary">
                    ${(project.investment.total / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-plush-graphite/60">Собрано</span>
                  <span className="text-lg font-semibold text-plush-sky">
                    ${(project.investment.current / 1000).toFixed(0)}K ({project.investment.progress}%)
                  </span>
                </div>
              </div>
            </div>
          </SoftCard>

          {/* Timeline */}
          <SoftCard depth={1} className="p-6">
            <h3 className="text-xl font-semibold text-plush-graphite mb-4">Сроки разработки</h3>
            <div className="space-y-3">
              {Object.entries(project.timeline).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-plush-graphite/70 capitalize">{key === 'total' ? 'Итого' : key}</span>
                  <span className="font-semibold text-plush-graphite">{value as string}</span>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* Документация */}
          <SoftCard depth={1} className="p-6">
            <h3 className="text-xl font-semibold text-plush-graphite mb-4">Документация</h3>
            <div className="space-y-2">
              {project.documents.map((doc: string, i: number) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-plush-card bg-plush-cream-pressed">
                  <Lock size={16} className="text-plush-graphite/40" />
                  <span className="text-sm text-plush-graphite/70">{doc}</span>
                  <span className="ml-auto text-xs text-plush-graphite/40">Требуется стейкинг</span>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* CTA */}
          <SoftCard depth={2} className="p-6 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <h3 className="text-xl font-semibold text-plush-graphite mb-4">Инвестировать в проект</h3>
            <p className="text-plush-graphite/70 mb-4">
              Участвуйте в развитии проекта через токен-стейкинг. Чем больше вы стейкаете, тем больше доступа к документации и прибыли.
            </p>
            <SoftButton variant="primary" size="lg" className="w-full">
              <Zap size={20} className="mr-2" />
              Начать стейкинг
            </SoftButton>
          </SoftCard>
        </div>
      }
    />
  )
}
