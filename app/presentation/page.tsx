'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, Target, TrendingUp, Users, 
  DollarSign, Zap, Award, Heart, Globe, Rocket 
} from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DoghouseIcon, PawHeartIcon, BoneIcon } from '@/components/icons/DogymorbisIcons'

const generalSlides = [
  {
    id: 1,
    title: 'Dogymorbis',
    subtitle: 'Социальная сеть и DAO для владельцев собак',
    content: 'Единая платформа, объединяющая карту прогулок, социальную сеть, маркетплейс и децентрализованное управление',
    icon: <DoghouseIcon size={80} className="text-sky" />,
    gradient: 'from-sky to-info',
  },
  {
    id: 2,
    title: 'Проблема',
    subtitle: 'Разрозненность сервисов',
    content: 'Владельцы собак вынуждены использовать множество приложений: карты для прогулок, соцсети для общения, интернет-магазины для покупок, отдельные сервисы для дрессировки и здоровья',
    points: [
      'Отсутствие единого пространства для собачников',
      'Сложность поиска партнёров по прогулкам',
      'Нет доступных инструментов для монетизации активности',
      'Отсутствие прозрачного управления сообществом',
    ],
    gradient: 'from-burgundy to-danger',
  },
  {
    id: 3,
    title: 'Решение',
    subtitle: 'Всё в одном месте',
    content: 'Dogymorbis объединяет все необходимые функции в едином приложении',
    features: [
      { icon: '🗺️', title: 'Карта прогулок', desc: 'GPS-трекинг, маршруты, локации' },
      { icon: '📱', title: 'Социальная сеть', desc: 'Посты, лайки, комментарии' },
      { icon: '💰', title: 'BoneCoin', desc: 'Внутренняя валюта за активность' },
      { icon: '🛒', title: 'Маркетплейс', desc: 'Товары и услуги для питомцев' },
      { icon: '🏛️', title: 'DAO', desc: 'Децентрализованное управление' },
      { icon: '🎮', title: 'Геймификация', desc: 'Задания, награды, рейтинги' },
    ],
    gradient: 'from-success to-honey',
  },
  {
    id: 4,
    title: 'Рынок',
    subtitle: 'Огромный потенциал роста',
    content: 'По данным American Pet Products Association (APPA):',
    stats: [
      { value: '$152B', label: 'Объём рынка в 2024', icon: <DollarSign size={32} /> },
      { value: '$157B', label: 'Прогноз на 2025', icon: <TrendingUp size={32} /> },
      { value: '68M+', label: 'Домохозяйств с собаками в США', icon: <Users size={32} /> },
      { value: '400M+', label: 'Собак в мире', icon: <Globe size={32} /> },
    ],
    gradient: 'from-honey to-warning',
  },
  {
    id: 5,
    title: 'Бизнес-модель',
    subtitle: 'Множественные источники дохода',
    streams: [
      { title: 'Freemium подписка', desc: 'AI-анализ здоровья и поведения, премиум-функции', revenue: '30%' },
      { title: 'Комиссия маркетплейс', desc: 'С продаж товаров и услуг', revenue: '40%' },
      { title: 'Реклама и партнёрства', desc: 'Нативная реклама, спонсорские интеграции', revenue: '20%' },
      { title: 'BoneCoin экосистема', desc: 'Обмен, стейкинг, комиссии', revenue: '10%' },
    ],
    gradient: 'from-sky to-burgundy',
  },
  {
    id: 6,
    title: 'Дорожная карта',
    subtitle: '2025-2026',
    quarters: [
      { q: 'Q1 2025', items: ['Запуск MVP', 'Карта и Лента', 'BoneCoin', '1K пользователей'] },
      { q: 'Q2 2025', items: ['Маркетплейс', 'DAO запуск', 'Партнёрская программа', '10K пользователей'] },
      { q: 'Q3 2025', items: ['AI-анализ', 'NFT достижения', 'Международная экспансия', '50K пользователей'] },
      { q: 'Q4 2025', items: ['Мобильные приложения', 'GPS-трекеры интеграция', 'B2B платформа', '100K пользователей'] },
    ],
    gradient: 'from-info to-success',
  },
  {
    id: 7,
    title: 'Присоединяйтесь!',
    subtitle: 'Гуляй, общайся, получай косточки',
    content: 'Станьте частью крупнейшего сообщества владельцев собак',
    cta: [
      { text: 'Скачать приложение', link: '#', variant: 'primary' as const },
      { text: 'Стать партнёром', link: '/partner', variant: 'secondary' as const },
      { text: 'Инвестировать в DAO', link: '/dao', variant: 'secondary' as const },
    ],
    gradient: 'from-burgundy to-sky',
  },
]

const partnerSlides = [
  {
    id: 1,
    title: 'Партнёрская программа Dogymorbis',
    subtitle: 'Растите вместе с нами',
    content: 'Подключайтесь к крупнейшей платформе для владельцев собак и увеличивайте продажи',
    icon: <Award size={80} className="text-honey" />,
    gradient: 'from-honey to-warning',
  },
  {
    id: 2,
    title: 'Преимущества для партнёров',
    benefits: [
      { 
        icon: <Users size={32} />, 
        title: 'Целевая аудитория', 
        desc: 'Доступ к тысячам активных владельцев собак в вашем регионе'
      },
      { 
        icon: <TrendingUp size={32} />, 
        title: 'Рост продаж', 
        desc: 'Увеличение продаж на 30-50% в первые 3 месяца'
      },
      { 
        icon: <Zap size={32} />, 
        title: 'Простая интеграция', 
        desc: 'Настройка витрины за 15 минут, поддержка 24/7'
      },
      { 
        icon: <Heart size={32} />, 
        title: 'Лояльность', 
        desc: 'Программа кэшбека и реферальные бонусы для клиентов'
      },
    ],
    gradient: 'from-success to-sky',
  },
  {
    id: 3,
    title: 'Что вы получаете',
    features: [
      '✅ Витрина товаров и услуг в приложении',
      '✅ Управление запасами и заказами',
      '✅ Реферальная программа с кэшбеком в BoneCoin',
      '✅ Отображение на карте города',
      '✅ Участие в событиях и мероприятиях',
      '✅ Аналитика и статистика продаж',
      '✅ Доступ к API для интеграций',
      '✅ Маркетинговая поддержка',
    ],
    gradient: 'from-info to-burgundy',
  },
  {
    id: 4,
    title: 'Кейсы успеха',
    cases: [
      { 
        company: 'Зоомагазин "Четыре лапы"', 
        result: '+45% продаж за 2 месяца',
        quote: 'Dogymorbis привёл нам множество новых клиентов из района',
      },
      { 
        company: 'Ветклиника "Айболит"', 
        result: '+120 новых клиентов',
        quote: 'Интеграция окупилась в первый же месяц',
      },
      { 
        company: 'Груминг-салон "Красота лап"', 
        result: '85% заполненность',
        quote: 'Теперь записи расписаны на 2 недели вперёд',
      },
    ],
    gradient: 'from-sky to-success',
  },
  {
    id: 5,
    title: 'Тарифные планы',
    plans: [
      {
        name: 'Базовый',
        price: 'Бесплатно',
        features: ['Витрина до 20 товаров', 'Базовая аналитика', 'Отображение на карте', 'Комиссия 15%'],
      },
      {
        name: 'Профессиональный',
        price: '2,990₽/мес',
        features: ['Неограниченные товары', 'Расширенная аналитика', 'Приоритет в поиске', 'Комиссия 10%', 'Маркетинговая поддержка'],
        highlighted: true,
      },
      {
        name: 'Премиум',
        price: '9,990₽/мес',
        features: ['Всё из Профессионального', 'API-доступ', 'Баннеры в приложении', 'Комиссия 5%', 'Персональный менеджер'],
      },
    ],
    gradient: 'from-burgundy to-honey',
  },
  {
    id: 6,
    title: 'Начните прямо сейчас',
    subtitle: '3 простых шага',
    steps: [
      { number: 1, title: 'Регистрация', desc: 'Заполните форму партнёра — 5 минут' },
      { number: 2, title: 'Настройка', desc: 'Добавьте товары и услуги в витрину' },
      { number: 3, title: 'Запуск', desc: 'Получайте заказы и зарабатывайте' },
    ],
    cta: { text: 'Стать партнёром', variant: 'primary' as const },
    gradient: 'from-sky to-info',
  },
]

export default function PresentationPage() {
  const [mode, setMode] = useState<'general' | 'partner'>('general')
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = mode === 'general' ? generalSlides : partnerSlides

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const slide = slides[currentSlide]

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppBar 
        title="Презентация" 
        actions={
          <div className="flex gap-2">
            <Button 
              variant={mode === 'general' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => { setMode('general'); setCurrentSlide(0); }}
            >
              Общая
            </Button>
            <Button 
              variant={mode === 'partner' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => { setMode('partner'); setCurrentSlide(0); }}
            >
              Партнёрская
            </Button>
          </div>
        }
      />

      {/* Slide */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${currentSlide}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className={`h-full bg-gradient-to-br ${slide.gradient} p-8 flex items-center justify-center`}>
              <div className="max-w-5xl w-full">
                <Card className="p-8 md:p-12" elevation={3}>
                  <div className="text-center mb-8">
                    {slide.icon && <div className="mb-6">{slide.icon}</div>}
                    <h1 className="text-display md:text-[40px] font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-title text-text-secondary-light dark:text-text-secondary-dark">
                      {slide.subtitle}
                    </p>
                  </div>

                  {slide.content && (
                    <p className="text-label text-center text-text-primary-light dark:text-text-primary-dark mb-8">
                      {slide.content}
                    </p>
                  )}

                  {/* Points List */}
                  {('points' in slide) && slide.points && (
                    <ul className="space-y-3 max-w-2xl mx-auto">
                      {slide.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-label text-text-primary-light dark:text-text-primary-dark"
                        >
                          <span className="text-danger text-xl">●</span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Features Grid */}
                  {('features' in slide && slide.features && Array.isArray(slide.features) && typeof slide.features[0] === 'object') && (
                    <div className="grid md:grid-cols-3 gap-6">
                      {slide.features.map((feature: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-center p-6 bg-surface2-light dark:bg-surface2-dark rounded-lg"
                        >
                          <div className="text-4xl mb-3">{feature.icon}</div>
                          <h3 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                            {feature.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  {('stats' in slide) && slide.stats && (
                    <div className="grid md:grid-cols-4 gap-6">
                      {slide.stats.map((stat: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="text-center p-6 bg-white dark:bg-surface-dark rounded-lg elevation-2"
                        >
                          <div className="text-sky mb-3">{stat.icon}</div>
                          <p className="text-display font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                            {stat.value}
                          </p>
                          <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                            {stat.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Revenue Streams */}
                  {('streams' in slide) && slide.streams && (
                    <div className="space-y-4">
                      {slide.streams.map((stream: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-surface2-light dark:bg-surface2-dark rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                              {stream.title}
                            </h3>
                            <span className="text-title font-bold text-success">{stream.revenue}</span>
                          </div>
                          <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                            {stream.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Quarters */}
                  {('quarters' in slide) && slide.quarters && (
                    <div className="grid md:grid-cols-4 gap-4">
                      {slide.quarters.map((quarter: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-surface2-light dark:bg-surface2-dark rounded-lg"
                        >
                          <h4 className="text-label font-bold text-sky mb-3">{quarter.q}</h4>
                          <ul className="space-y-2">
                            {quarter.items.map((item: string, j: number) => (
                              <li key={j} className="text-caption text-text-primary-light dark:text-text-primary-dark">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Benefits */}
                  {('benefits' in slide) && slide.benefits && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {slide.benefits.map((benefit: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 bg-surface2-light dark:bg-surface2-dark rounded-lg"
                        >
                          <div className="text-sky mb-3">{benefit.icon}</div>
                          <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                            {benefit.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Features List (strings) */}
                  {('features' in slide && slide.features && Array.isArray(slide.features) && typeof slide.features[0] === 'string') && (
                    <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                      {(slide.features as string[]).map((feature: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-label text-text-primary-light dark:text-text-primary-dark"
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Cases */}
                  {('cases' in slide) && slide.cases && (
                    <div className="space-y-6">
                      {slide.cases.map((case_: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="p-6 bg-surface2-light dark:bg-surface2-dark rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                              {case_.company}
                            </h3>
                            <span className="text-body font-bold text-success">{case_.result}</span>
                          </div>
                          <p className="text-body italic text-text-secondary-light dark:text-text-secondary-dark">
                            &quot;{case_.quote}&quot;
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Plans */}
                  {('plans' in slide) && slide.plans && (
                    <div className="grid md:grid-cols-3 gap-6">
                      {slide.plans.map((plan: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-6 rounded-lg ${
                            plan.highlighted 
                              ? 'bg-gradient-to-br from-sky to-info text-white elevation-3' 
                              : 'bg-surface2-light dark:bg-surface2-dark'
                          }`}
                        >
                          <h3 className={`text-label font-bold mb-2 ${
                            plan.highlighted ? 'text-white' : 'text-text-primary-light dark:text-text-primary-dark'
                          }`}>
                            {plan.name}
                          </h3>
                          <p className={`text-display font-bold mb-4 ${
                            plan.highlighted ? 'text-white' : 'text-sky'
                          }`}>
                            {plan.price}
                          </p>
                          <ul className="space-y-2">
                            {plan.features.map((feature: string, j: number) => (
                              <li key={j} className={`text-caption ${
                                plan.highlighted ? 'text-white opacity-90' : 'text-text-secondary-light dark:text-text-secondary-dark'
                              }`}>
                                • {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Steps */}
                  {('steps' in slide) && slide.steps && (
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {slide.steps.map((step: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-sky text-white flex items-center justify-center text-display font-bold mx-auto mb-4">
                            {step.number}
                          </div>
                          <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                            {step.title}
                          </h3>
                          <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                            {step.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {('cta' in slide) && Array.isArray(slide.cta) && (
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                      {slide.cta.map((button: any, i: number) => (
                        <Button key={i} variant={button.variant} size="lg">
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                  {('cta' in slide) && !Array.isArray(slide.cta) && (
                    <div className="text-center">
                      <Button variant={(slide.cta as any).variant} size="lg">
                        {(slide.cta as any).text}
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="bg-surface-light dark:bg-surface-dark border-t border-line-light dark:border-line-dark p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-sky w-8'
                    : 'bg-surface2-light dark:bg-surface2-dark w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}


