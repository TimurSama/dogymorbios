'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Map, Users, Heart, BookOpen, ShoppingBag, Building2,
  TrendingUp, DollarSign, Globe, Award, Zap, Shield,
  ArrowRight, Check, Star, Play
} from 'lucide-react'
import { DoghouseIcon, BoneIcon, PawHeartIcon } from '@/components/icons/DogymorbisIcons'
import { useState } from 'react'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { WhitepaperPopup } from '@/components/whitepaper/WhitepaperPopup'
import { whitepaperSections, getRelatedSections } from '@/lib/whitepaper-data'
import { BoneCoin } from '@/components/ui/BoneCoin'

/**
 * Полноценный лендинг Dogymorbis
 * Все секции согласно плану доработки
 */
export default function LandingPage() {
  const router = useRouter()
  const [openPopup, setOpenPopup] = useState<string | null>(null)

  // Статистика (mock данные)
  const stats = {
    users: '12,458',
    bones: '2,847,392',
    walks: '156,234'
  }

  const handleOpenPopup = (id: string) => {
    setOpenPopup(id)
  }

  const handleClosePopup = () => {
    setOpenPopup(null)
  }

  const handleOpenRelated = (id: string) => {
    setOpenPopup(id)
  }

  return (
    <div className="min-h-screen bg-plush-cream">
      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 safe-area-top">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <DoghouseIcon size={120} className="text-plush-primary" strokeWidth={2} />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-plush-graphite">
              Dogymorbis
            </h1>
            <p className="text-2xl md:text-3xl text-plush-graphite/70 font-medium">
              Твоя собака заслуживает лучшего
            </p>
            <p className="text-lg md:text-xl text-plush-graphite/60 max-w-2xl mx-auto">
              Единая платформа для прогулок, общения, ухода и заработка
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <SoftButton 
              variant="primary" 
              size="lg"
              onClick={() => router.push('/auth?mode=register')}
              className="min-w-[200px]"
            >
              Начать бесплатно
            </SoftButton>
            <SoftButton 
              variant="ghost" 
              size="lg"
              onClick={() => router.push('/presentation')}
              className="min-w-[200px]"
            >
              Смотреть презентацию
            </SoftButton>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-12"
          >
            {[
              { label: 'Пользователей', value: stats.users, icon: Users },
              { label: 'Косточек заработано', value: stats.bones, icon: BoneIcon },
              { label: 'Прогулок отслежено', value: stats.walks, icon: Map },
            ].map((stat, i) => (
              <SoftCard key={i} depth={1} className="p-6 text-center">
                <stat.icon size={32} className="mx-auto mb-2 text-plush-primary" />
                <p className="text-2xl font-bold text-plush-graphite">{stat.value}</p>
                <p className="text-sm text-plush-graphite/60 mt-1">{stat.label}</p>
              </SoftCard>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-plush-graphite/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-plush-graphite/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Проблема */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Устали от разрозненных сервисов?
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Владельцы собак вынуждены использовать множество приложений
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Разные приложения', desc: 'Для карт, соцсетей, покупок и ухода' },
              { title: 'Нет сообщества', desc: 'Сложно найти единомышленников' },
              { title: 'Нет партнёров', desc: 'Трудно найти компанию для прогулок' },
              { title: 'Нет мотивации', desc: 'Не хватает стимула для регулярности' },
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-plush-alert/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">❌</span>
                  </div>
                  <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-plush-graphite/60 text-sm">
                    {problem.desc}
                  </p>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="py-20 px-4 bg-plush-cream-elevated">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Всё в одном месте
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Dogymorbis объединяет все необходимые функции
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Map, title: 'Карта прогулок', desc: 'GPS-трекинг, маршруты, сбор призов', color: 'text-plush-primary', popupId: 'ecosystem' },
              { icon: Users, title: 'Социальная сеть', desc: 'Посты, лайки, комментарии, друзья', color: 'text-plush-sky', popupId: 'ecosystem' },
              { icon: BoneIcon, title: 'BoneCoin', desc: 'Внутренняя валюта за активность', color: 'text-plush-yellow', popupId: 'tokenomics' },
              { icon: Heart, title: 'Умный дейтинг', desc: 'Combo-Match для владельцев и собак', color: 'text-plush-alert', popupId: 'ecosystem' },
              { icon: BookOpen, title: 'Умный журнал', desc: 'AI-анализ здоровья и поведения', color: 'text-plush-sky', popupId: 'ecosystem' },
              { icon: Building2, title: 'DAO управление', desc: 'Децентрализованное управление', color: 'text-plush-primary', popupId: 'ecosystem' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard 
                  depth={1} 
                  interactive 
                  hover 
                  className="p-6 h-full cursor-pointer"
                  onClick={() => feature.popupId && handleOpenPopup(feature.popupId)}
                >
                  <feature.icon size={48} className={`mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-plush-graphite/60 mb-3">
                    {feature.desc}
                  </p>
                  <SoftButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      feature.popupId && handleOpenPopup(feature.popupId)
                    }}
                    className="w-full"
                  >
                    Подробнее
                  </SoftButton>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-plush-graphite/70">
              4 простых шага к лучшей жизни с собакой
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Регистрация', desc: 'Создайте профиль и добавьте питомца', icon: Users },
              { step: 2, title: 'Начните прогулку', desc: 'Собирайте косточки и выполняйте задания', icon: Map },
              { step: 3, title: 'Общайтесь', desc: 'Находите друзей и единомышленников', icon: Heart },
              { step: 4, title: 'Зарабатывайте', desc: 'Тратьте BoneCoin в маркетплейсе', icon: BoneIcon },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <SoftCard depth={1} className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-plush-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <step.icon size={40} className="mx-auto mb-4 text-plush-primary" />
                  <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                    {step.title}
                  </h3>
                  <p className="text-plush-graphite/60">
                    {step.desc}
                  </p>
                </SoftCard>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-plush-graphite/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Рынок */}
      <section className="py-20 px-4 bg-plush-cream-elevated">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Огромный рынок
            </h2>
            <p className="text-xl text-plush-graphite/70">
              По данным American Pet Products Association (APPA)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '$152B', label: 'Объём рынка в 2024', icon: DollarSign, popupId: 'market' },
                { value: '$157B', label: 'Прогноз на 2025', icon: TrendingUp, popupId: 'market' },
                { value: '68M+', label: 'Домохозяйств с собаками в США', icon: Users, popupId: 'market' },
                { value: '400M+', label: 'Собак в мире', icon: Globe, popupId: 'market' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SoftCard 
                    depth={2} 
                    interactive
                    hover
                    className="p-8 text-center cursor-pointer"
                    onClick={() => stat.popupId && handleOpenPopup(stat.popupId)}
                  >
                    <stat.icon size={48} className="mx-auto mb-4 text-plush-primary" />
                    <p className="text-4xl font-bold text-plush-graphite mb-2">
                      {stat.value}
                    </p>
                    <p className="text-plush-graphite/60">
                      {stat.label}
                    </p>
                  </SoftCard>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Бизнес-модель */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Бизнес-модель
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Множественные источники дохода
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: 'Подписки', desc: 'Премиум-функции и AI-анализ', popupId: 'business-model' },
              { icon: ShoppingBag, title: 'Маркетплейс', desc: 'Комиссия с продаж', popupId: 'business-model' },
              { icon: TrendingUp, title: 'Реклама', desc: 'Таргетированная реклама', popupId: 'business-model' },
              { icon: Zap, title: 'R&D', desc: 'Умные аксессуары и устройства', popupId: 'business-model' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard 
                  depth={1} 
                  interactive
                  hover
                  className="p-6 text-center cursor-pointer"
                  onClick={() => item.popupId && handleOpenPopup(item.popupId)}
                >
                  <item.icon size={40} className="mx-auto mb-4 text-plush-primary" />
                  <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                    {item.title}
                  </h3>
                  <p className="text-plush-graphite/60 text-sm">
                    {item.desc}
                  </p>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Токеномика */}
      <section className="py-20 px-4 bg-plush-cream-elevated">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              BoneCoin — внутренняя валюта
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Зарабатывайте и тратьте косточки
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SoftCard depth={1} className="p-6">
                <h3 className="text-xl font-semibold text-plush-graphite mb-4">
                  Как заработать
                </h3>
                <ul className="space-y-3">
                  {[
                    'Прогулки и активность',
                    'Выполнение заданий',
                    'Социальная активность',
                    'Стейкинг и участие в DAO',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={20} className="text-plush-primary" />
                      <span className="text-plush-graphite">{item}</span>
                    </li>
                  ))}
                </ul>
              </SoftCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SoftCard depth={1} className="p-6">
                <h3 className="text-xl font-semibold text-plush-graphite mb-4">
                  Как потратить
                </h3>
                <ul className="space-y-3">
                  {[
                    'Покупки в маркетплейсе',
                    'Премиум-подписки',
                    'Умные аксессуары',
                    'Участие в DAO',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <BoneIcon size={20} className="text-plush-yellow" />
                      <span className="text-plush-graphite">{item}</span>
                    </li>
                  ))}
                </ul>
              </SoftCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <SoftButton
              variant="primary"
              size="lg"
              onClick={() => handleOpenPopup('tokenomics')}
            >
              Подробнее о токеномике
            </SoftButton>
          </motion.div>
        </div>
      </section>

      {/* Дорожная карта */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Дорожная карта
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Наши планы на 2025-2026
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-plush-primary/20 hidden md:block" />
            <div className="space-y-8">
              {[
                { quarter: 'Q1 2025', title: 'Запуск MVP', desc: 'Основные функции и бета-тестирование' },
                { quarter: 'Q2 2025', title: 'Маркетплейс', desc: 'Интеграция партнёров и торговля' },
                { quarter: 'Q3 2025', title: 'DAO запуск', desc: 'Децентрализованное управление' },
                { quarter: 'Q4 2025', title: 'Умные устройства', desc: 'Smart Collar и аксессуары' },
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="hidden md:block absolute left-6 w-4 h-4 rounded-full bg-plush-primary plush-depth-2 z-10" />
                  <SoftCard depth={1} className="p-6 ml-16 md:ml-0 flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-plush-primary">
                        {milestone.quarter}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-plush-graphite/60">
                      {milestone.desc}
                    </p>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <SoftButton
              variant="primary"
              size="lg"
              onClick={() => handleOpenPopup('roadmap')}
            >
              Полная дорожная карта
            </SoftButton>
          </motion.div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-20 px-4 bg-plush-cream-elevated">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Что говорят пользователи
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Отзывы наших ранних пользователей
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Анна', dog: 'Макс', text: 'Наконец-то всё в одном месте! Прогулки стали интереснее, а косточки мотивируют.', rating: 5 },
              { name: 'Дмитрий', dog: 'Луна', text: 'Отличное сообщество единомышленников. Нашли много друзей для совместных прогулок.', rating: 5 },
              { name: 'Мария', dog: 'Рекс', text: 'AI-анализ в журнале помог заметить проблемы со здоровьем раньше. Спасибо!', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={16} className="text-plush-yellow fill-plush-yellow" />
                    ))}
                  </div>
                  <p className="text-plush-graphite mb-4 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-plush-primary/10 flex items-center justify-center">
                      <Users size={20} className="text-plush-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-plush-graphite">{review.name}</p>
                      <p className="text-sm text-plush-graphite/60">с {review.dog}</p>
                    </div>
                  </div>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Люди, которые делают Dogymorbis возможным
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Команда разработки', role: 'Frontend, Backend, Mobile', icon: Zap },
              { name: 'Команда дизайна', role: 'UI/UX, Брендинг', icon: Award },
              { name: 'Команда бизнеса', role: 'Маркетинг, Партнёрства', icon: TrendingUp },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-plush-primary/10 flex items-center justify-center mx-auto mb-4">
                    <member.icon size={40} className="text-plush-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                    {member.name}
                  </h3>
                  <p className="text-plush-graphite/60 text-sm">
                    {member.role}
                  </p>
                </SoftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Инвестиции */}
      <section className="py-20 px-4 bg-plush-cream-elevated">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite mb-4">
              Инвестиционный план
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Присоединяйтесь к раунду инвестиций
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { amount: '$500K', label: 'Seed Round', desc: 'MVP и запуск', popupId: 'investment' },
              { amount: '$2M', label: 'Series A', desc: 'Масштабирование', popupId: 'investment' },
              { amount: '$5M', label: 'Series B', desc: 'Международная экспансия', popupId: 'investment' },
            ].map((round, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SoftCard 
                  depth={2} 
                  interactive
                  hover
                  className="p-6 text-center cursor-pointer"
                  onClick={() => round.popupId && handleOpenPopup(round.popupId)}
                >
                  <p className="text-3xl font-bold text-plush-primary mb-2">
                    {round.amount}
                  </p>
                  <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                    {round.label}
                  </h3>
                  <p className="text-plush-graphite/60 text-sm">
                    {round.desc}
                  </p>
                </SoftCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <SoftButton
              variant="primary"
              size="lg"
              onClick={() => router.push('/investors')}
            >
              Узнать больше для инвесторов
            </SoftButton>
          </motion.div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Готовы начать?
            </h2>
            <p className="text-xl text-plush-graphite/70">
              Присоединяйтесь к крупнейшему сообществу владельцев собак
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SoftButton 
                variant="primary" 
                size="lg"
                onClick={() => router.push('/auth?mode=register')}
                className="min-w-[200px]"
              >
                Начать бесплатно
              </SoftButton>
              <SoftButton 
                variant="sky" 
                size="lg"
                onClick={() => router.push('/partner-landing')}
                className="min-w-[200px]"
              >
                Стать партнёром
              </SoftButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-12 px-4 bg-plush-graphite text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Dogymorbis</h3>
              <p className="text-white/70 text-sm">
                Социальная сеть и DAO для владельцев собак
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/map" className="hover:text-white">Карта</a></li>
                <li><a href="/feed" className="hover:text-white">Лента</a></li>
                <li><a href="/store" className="hover:text-white">Магазин</a></li>
                <li><a href="/dao" className="hover:text-white">DAO</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/about" className="hover:text-white">О проекте</a></li>
                <li><a href="/investors" className="hover:text-white">Инвесторам</a></li>
                <li><a href="/partner" className="hover:text-white">Партнёрам</a></li>
                <li><a href="/contact" className="hover:text-white">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/help" className="hover:text-white">Помощь</a></li>
                <li><a href="/whitepaper" className="hover:text-white">Вайтпэпер</a></li>
                <li><a href="/presentation" className="hover:text-white">Презентация</a></li>
                <li><a href="/presentation/detailed" className="hover:text-white">Детальная презентация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                {/* Иконки соцсетей можно добавить позже */}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
            <p>© 2025 Dogymorbis. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
