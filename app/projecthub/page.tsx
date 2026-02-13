'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, ToyBrick, Droplets, TrendingUp, DollarSign, 
  Calendar, Users, Target, ArrowRight, FileText,
  Zap, Heart, Activity, MapPin, Wifi
} from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { AppBar } from '@/components/navigation/AppBar'
import { Modal } from '@/components/ui/Modal'

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
      status: 'В разработке',
      progress: 45,
      description: 'Ошейник с системой мониторинга и сбора информации о жизненных показателях и активности питомца',
      features: [
        'Мониторинг давления, пульса, дыхания',
        'Отслеживание движений (ходьба, бег, игры, тренировки)',
        'Анализ сна',
        'GPS-трекинг',
        'NFC для быстрой идентификации',
        'Синхронизация с приложением',
      ],
      market: {
        size: '$2.5B',
        growth: '+18%',
        target: '15M собак в России',
      },
      budget: {
        total: '$850K',
        spent: '$382K',
        remaining: '$468K',
        phases: [
          { name: 'Исследования', amount: '$150K', status: 'Завершено' },
          { name: 'Прототип', amount: '$200K', status: 'В процессе' },
          { name: 'Тестирование', amount: '$150K', status: 'Запланировано' },
          { name: 'Производство', amount: '$350K', status: 'Запланировано' },
        ],
      },
      timeline: {
        start: '2024 Q3',
        prototype: '2025 Q2',
        production: '2025 Q4',
      },
      team: 8,
      documents: ['Техническое задание', 'Схемы и чертежи', 'Исследование рынка', 'Бизнес-план'],
    },
    {
      id: 'smart-toys',
      title: 'Смарт игрушки',
      icon: <ToyBrick size={48} />,
      status: 'Концепция',
      progress: 25,
      description: 'Игрушки и тренажеры с настраиваемыми режимами включения, реакций и игр с камерами и удаленным подключением',
      features: [
        'Убегающий мячик с автономным движением',
        'Настенная веревка-тягалка с датчиками силы',
        'Беговая дорожка для собак и людей',
        'Настраиваемый наклон и скорость',
        'Выдача вкусных поощрений за активность',
        'Камеры для наблюдения',
        'Удаленное управление через приложение',
        'Автоматическое выключение на ночь',
      ],
      market: {
        size: '$1.8B',
        growth: '+22%',
        target: '12M активных владельцев',
      },
      budget: {
        total: '$1.2M',
        spent: '$300K',
        remaining: '$900K',
        phases: [
          { name: 'Исследования', amount: '$200K', status: 'В процессе' },
          { name: 'Прототип мячика', amount: '$150K', status: 'Запланировано' },
          { name: 'Прототип дорожки', amount: '$400K', status: 'Запланировано' },
          { name: 'Производство', amount: '$450K', status: 'Запланировано' },
        ],
      },
      timeline: {
        start: '2024 Q4',
        prototype: '2025 Q3',
        production: '2026 Q1',
      },
      team: 12,
      documents: ['Концепция продуктов', 'Технические требования', 'Исследование рынка'],
    },
    {
      id: 'smart-accessories',
      title: 'Смарт аксессуары',
      icon: <Droplets size={48} />,
      status: 'Исследования',
      progress: 15,
      description: 'Поилки, кормушки с синхронизацией с приложением для оптимального расчета порций и времени приема пищи',
      features: [
        'Умная кормушка с дозатором',
        'Синхронизация с приложением',
        'Оптимальный расчет порций',
        'Учет дополнительного кормления (мясо, лакомства)',
        'Интерактивный коврик с препятствиями',
        'Развитие обоняния и поиска',
        'Увеличение времени приема пищи',
        'Умная поилка с контролем потребления воды',
      ],
      market: {
        size: '$3.2B',
        growth: '+15%',
        target: '20M домашних питомцев',
      },
      budget: {
        total: '$650K',
        spent: '$98K',
        remaining: '$552K',
        phases: [
          { name: 'Исследования', amount: '$100K', status: 'В процессе' },
          { name: 'Прототип кормушки', amount: '$180K', status: 'Запланировано' },
          { name: 'Прототип коврика', amount: '$120K', status: 'Запланировано' },
          { name: 'Производство', amount: '$250K', status: 'Запланировано' },
        ],
      },
      timeline: {
        start: '2025 Q1',
        prototype: '2025 Q4',
        production: '2026 Q2',
      },
      team: 6,
      documents: ['Исследование потребностей', 'Техническая концепция', 'Маркетинговый анализ'],
    },
  ]

  const selectedProject = projects.find(p => p.id === openProject)

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="ProjectHub" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
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
              Инновационные продукты для улучшения жизни с питомцами
            </p>
          </motion.div>

          {/* Статистика */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Проектов', value: projects.length, icon: Target },
              { label: 'Бюджет', value: '$2.7M', icon: DollarSign },
              { label: 'Команда', value: '26', icon: Users },
              { label: 'Прогресс', value: '28%', icon: TrendingUp },
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
          <div className="grid md:grid-cols-3 gap-6">
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
                  className="p-6 cursor-pointer h-full"
                  onClick={() => setOpenProject(project.id)}
                >
                  <div className="text-plush-primary mb-4">{project.icon}</div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-plush-graphite">
                      {project.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold bg-plush-primary/10 text-plush-primary rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-plush-graphite/70 mb-4">
                    {project.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-plush-graphite/60">Прогресс</span>
                      <span className="font-semibold text-plush-graphite">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                      <div
                        className="bg-plush-primary h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-plush-graphite/60">Бюджет</span>
                    <span className="font-semibold text-plush-primary">{project.budget.total}</span>
                  </div>
                  <SoftButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenProject(project.id)
                    }}
                    className="w-full mt-4"
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

      {/* Модальное окно проекта */}
      {selectedProject && (
        <Modal
          isOpen={openProject === selectedProject.id}
          onClose={() => setOpenProject(null)}
          title={selectedProject.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Статус и прогресс */}
            <div className="grid md:grid-cols-3 gap-4">
              <SoftCard depth={1} className="p-4">
                <p className="text-sm text-plush-graphite/60 mb-1">Статус</p>
                <p className="font-semibold text-plush-graphite">{selectedProject.status}</p>
              </SoftCard>
              <SoftCard depth={1} className="p-4">
                <p className="text-sm text-plush-graphite/60 mb-1">Прогресс</p>
                <p className="font-semibold text-plush-graphite">{selectedProject.progress}%</p>
              </SoftCard>
              <SoftCard depth={1} className="p-4">
                <p className="text-sm text-plush-graphite/60 mb-1">Команда</p>
                <p className="font-semibold text-plush-graphite">{selectedProject.team} человек</p>
              </SoftCard>
            </div>

            {/* Описание */}
            <div>
              <h3 className="text-lg font-semibold text-plush-graphite mb-3">Описание</h3>
              <p className="text-plush-graphite/70">{selectedProject.description}</p>
            </div>

            {/* Функции */}
            <div>
              <h3 className="text-lg font-semibold text-plush-graphite mb-3">Функции</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {selectedProject.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Zap size={16} className="text-plush-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-plush-graphite/70">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Рынок */}
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-semibold text-plush-graphite mb-4">Анализ рынка</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-plush-graphite/60 mb-1">Размер рынка</p>
                  <p className="text-xl font-bold text-plush-primary">{selectedProject.market.size}</p>
                </div>
                <div>
                  <p className="text-sm text-plush-graphite/60 mb-1">Рост</p>
                  <p className="text-xl font-bold text-plush-sky">{selectedProject.market.growth}</p>
                </div>
                <div>
                  <p className="text-sm text-plush-graphite/60 mb-1">Целевая аудитория</p>
                  <p className="text-xl font-bold text-plush-graphite">{selectedProject.market.target}</p>
                </div>
              </div>
            </SoftCard>

            {/* Бюджет */}
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-semibold text-plush-graphite mb-4">Бюджет проекта</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Общий бюджет</span>
                  <span className="font-semibold text-plush-graphite">{selectedProject.budget.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Потрачено</span>
                  <span className="font-semibold text-plush-primary">{selectedProject.budget.spent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Осталось</span>
                  <span className="font-semibold text-plush-sky">{selectedProject.budget.remaining}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-plush-graphite">Этапы финансирования</h4>
                {selectedProject.budget.phases.map((phase, i) => (
                  <div key={i} className="p-3 bg-plush-cream-pressed rounded-plush-card">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-plush-graphite">{phase.name}</span>
                      <span className="text-plush-primary font-semibold">{phase.amount}</span>
                    </div>
                    <span className="text-xs text-plush-graphite/60">{phase.status}</span>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Таймлайн */}
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-semibold text-plush-graphite mb-4">Сроки</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Начало</span>
                  <span className="font-semibold text-plush-graphite">{selectedProject.timeline.start}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Прототип</span>
                  <span className="font-semibold text-plush-primary">{selectedProject.timeline.prototype}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plush-graphite/70">Запуск производства</span>
                  <span className="font-semibold text-plush-sky">{selectedProject.timeline.production}</span>
                </div>
              </div>
            </SoftCard>

            {/* Документы */}
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-semibold text-plush-graphite mb-4">Документация</h3>
              <div className="space-y-2">
                {selectedProject.documents.map((doc, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 bg-plush-cream-pressed rounded-plush-card hover:bg-plush-cream-elevated transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-plush-primary" />
                      <span className="text-plush-graphite">{doc}</span>
                    </div>
                    <ArrowRight size={16} className="text-plush-graphite/40" />
                  </button>
                ))}
              </div>
            </SoftCard>
          </div>
        </Modal>
      )}
    </div>
  )
}
