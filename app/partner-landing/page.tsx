'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Building2, TrendingUp, Users, Award, Check, ArrowRight,
  Store, BarChart3, Heart, Zap
} from 'lucide-react'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Публичная страница для партнёров
 * Landing для бизнеса
 */
export default function PartnerLandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Партнёрам" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Building2 size={80} className="mx-auto text-plush-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Партнёрская программа Dogymorbis
            </h1>
            <p className="text-xl text-plush-graphite/70 max-w-2xl mx-auto">
              Подключайтесь к крупнейшей платформе для владельцев собак и увеличивайте продажи
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SoftButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/partner-register')}
                className="min-w-[200px]"
              >
                Стать партнёром
              </SoftButton>
              <SoftButton
                variant="ghost"
                size="lg"
                onClick={() => router.push('/presentation?mode=partner')}
                className="min-w-[200px]"
              >
                Смотреть презентацию
              </SoftButton>
            </div>
          </motion.div>

          {/* Преимущества */}
          <div>
            <h2 className="text-3xl font-bold text-plush-graphite mb-8 text-center">
              Преимущества для партнёров
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Целевая аудитория',
                  desc: 'Доступ к тысячам активных владельцев собак',
                  color: 'plush-primary',
                },
                {
                  icon: TrendingUp,
                  title: 'Рост продаж',
                  desc: 'Увеличение продаж на 30-50% в первые 3 месяца',
                  color: 'plush-sky',
                },
                {
                  icon: Zap,
                  title: 'Простая интеграция',
                  desc: 'Настройка витрины за 15 минут, поддержка 24/7',
                  color: 'plush-yellow',
                },
                {
                  icon: Heart,
                  title: 'Лояльность',
                  desc: 'Программа кэшбека и реферальные бонусы',
                  color: 'plush-alert',
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6 text-center h-full">
                    <benefit.icon size={48} className={`mx-auto mb-4 text-${benefit.color}`} />
                    <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-plush-graphite/60">
                      {benefit.desc}
                    </p>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Что вы получаете */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-plush-graphite mb-6 text-center">
              Что вы получаете
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Витрина товаров и услуг в приложении',
                'Управление запасами и заказами',
                'Реферальная программа с кэшбеком в BoneCoin',
                'Отображение на карте города',
                'Участие в событиях и мероприятиях',
                'Аналитика и статистика продаж',
                'Доступ к API для интеграций',
                'Маркетинговая поддержка',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-plush-primary mt-0.5 flex-shrink-0" />
                  <span className="text-plush-graphite/70">{feature}</span>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* Тарифы */}
          <div>
            <h2 className="text-3xl font-bold text-plush-graphite mb-8 text-center">
              Тарифные планы
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Базовый',
                  price: 'Бесплатно',
                  features: [
                    'Витрина до 20 товаров',
                    'Базовая аналитика',
                    'Отображение на карте',
                    'Комиссия 15%',
                  ],
                },
                {
                  name: 'Профессиональный',
                  price: '2,990₽/мес',
                  features: [
                    'Неограниченные товары',
                    'Расширенная аналитика',
                    'Приоритет в поиске',
                    'Комиссия 10%',
                    'Маркетинговая поддержка',
                  ],
                  highlighted: true,
                },
                {
                  name: 'Премиум',
                  price: '9,990₽/мес',
                  features: [
                    'Всё из Профессионального',
                    'API-доступ',
                    'Баннеры в приложении',
                    'Комиссия 5%',
                    'Персональный менеджер',
                  ],
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard
                    depth={plan.highlighted ? 2 : 1}
                    className={`p-6 h-full ${plan.highlighted ? 'ring-2 ring-plush-primary' : ''}`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 text-xs font-semibold bg-plush-primary text-white rounded-full">
                          Популярный
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-3xl font-bold text-plush-primary mb-4">
                      {plan.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-plush-graphite/70">
                          <Check size={16} className="text-plush-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <SoftButton
                      variant={plan.highlighted ? 'primary' : 'ghost'}
                      size="md"
                      onClick={() => router.push('/partner-register')}
                      className="w-full"
                    >
                      Выбрать план
                    </SoftButton>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Кейсы успеха */}
          <div>
            <h2 className="text-3xl font-bold text-plush-graphite mb-8 text-center">
              Кейсы успеха
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  company: 'Зоомагазин "Четыре лапы"',
                  result: '+45% продаж',
                  quote: 'Dogymorbis привёл нам множество новых клиентов из района',
                },
                {
                  company: 'Ветклиника "Айболит"',
                  result: '+120 клиентов',
                  quote: 'Интеграция окупилась в первый же месяц',
                },
                {
                  company: 'Груминг-салон "Красота лап"',
                  result: '85% заполненность',
                  quote: 'Теперь записи расписаны на 2 недели вперёд',
                },
              ].map((case_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6">
                    <h3 className="font-semibold text-plush-graphite mb-2">{case_.company}</h3>
                    <p className="text-plush-primary font-bold mb-3">{case_.result}</p>
                    <p className="text-sm text-plush-graphite/70 italic">&quot;{case_.quote}&quot;</p>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <SoftCard depth={2} className="p-8 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-plush-graphite">
                Готовы начать?
              </h2>
              <p className="text-xl text-plush-graphite/70">
                Присоединяйтесь к партнёрской программе за 3 простых шага
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SoftButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/partner-register')}
                  className="min-w-[200px]"
                >
                  Стать партнёром
                  <ArrowRight size={20} className="ml-2" />
                </SoftButton>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
