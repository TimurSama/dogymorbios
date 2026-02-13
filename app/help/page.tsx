'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, MessageCircle, Mail, BookOpen, Video } from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { Input } from '@/components/ui/Input'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Страница помощи и поддержки
 */
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqCategories = [
    {
      title: 'Начало работы',
      icon: <BookOpen size={24} />,
      questions: [
        {
          q: 'Как зарегистрироваться?',
          a: 'Нажмите кнопку "Начать бесплатно" на главной странице и заполните форму регистрации. Процесс займёт всего 3 минуты.',
        },
        {
          q: 'Как добавить питомца?',
          a: 'После регистрации перейдите в раздел "Профиль" → "Питомцы" и нажмите "Добавить питомца". Заполните информацию о вашей собаке.',
        },
        {
          q: 'Как начать прогулку?',
          a: 'Откройте раздел "Карта" и нажмите кнопку "Начать прогулку". Приложение начнёт отслеживать ваш маршрут.',
        },
      ],
    },
    {
      title: 'BoneCoin',
      icon: <MessageCircle size={24} />,
      questions: [
        {
          q: 'Как заработать косточки?',
          a: 'Вы получаете косточки за прогулки (1 за 100м), посты (5-20), лайки (1), комментарии (2), сбор призов (10-100) и выполнение заданий (50-500).',
        },
        {
          q: 'Как потратить косточки?',
          a: 'Используйте косточки для получения скидок в маркетплейсе, оплаты консультаций, доступа к премиум-функциям и кастомизации профиля.',
        },
        {
          q: 'Что такое стейкинг?',
          a: 'Стейкинг позволяет заблокировать косточки на определённый срок и получать проценты. Чем дольше срок, тем выше процент.',
        },
      ],
    },
    {
      title: 'Карта и прогулки',
      icon: <Video size={24} />,
      questions: [
        {
          q: 'Как работает GPS-трекинг?',
          a: 'Приложение использует GPS вашего устройства для отслеживания маршрута. Данные сохраняются локально и синхронизируются с сервером.',
        },
        {
          q: 'Что такое сбор призов?',
          a: 'На карте периодически появляются призы (косточки). Подойдите к маркеру приза и нажмите на него, чтобы собрать награду.',
        },
        {
          q: 'Как найти партнёра для прогулки?',
          a: 'На карте отображаются другие пользователи поблизости. Нажмите на маркер пользователя и отправьте запрос на совместную прогулку.',
        },
      ],
    },
  ]

  const tutorials = [
    { title: 'Первые шаги', desc: 'Как начать пользоваться приложением', icon: <BookOpen size={32} /> },
    { title: 'Карта прогулок', desc: 'Использование GPS-трекинга', icon: <Video size={32} /> },
    { title: 'BoneCoin', desc: 'Как зарабатывать и тратить косточки', icon: <MessageCircle size={32} /> },
  ]

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Помощь" />

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Поиск */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-plush-graphite/40" />
              <Input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Видео-туториалы */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-4">
              Видео-туториалы
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tutorials.map((tutorial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} interactive hover className="p-6 text-center">
                    <div className="text-plush-primary mb-3 flex justify-center">
                      {tutorial.icon}
                    </div>
                    <h3 className="font-semibold text-plush-graphite mb-2">{tutorial.title}</h3>
                    <p className="text-sm text-plush-graphite/60">{tutorial.desc}</p>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-4">
              {faqCategories.map((category, catIndex) => (
                <SoftCard key={catIndex} depth={1} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-plush-primary">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-plush-graphite">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {category.questions.map((item, qIndex) => {
                      const index = catIndex * 10 + qIndex
                      const isOpen = openFaq === index

                      return (
                        <div key={qIndex} className="border-t border-plush-graphite/10 pt-3 first:border-t-0 first:pt-0">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <span className="font-medium text-plush-graphite pr-4">
                              {item.q}
                            </span>
                            <ChevronDown
                              size={20}
                              className={`text-plush-graphite/60 transition-transform flex-shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 text-plush-graphite/70"
                            >
                              {item.a}
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </SoftCard>
              ))}
            </div>
          </div>

          {/* Связаться с поддержкой */}
          <SoftCard depth={2} className="p-6 md:p-8 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-plush-graphite">
                Не нашли ответ?
              </h2>
              <p className="text-plush-graphite/70">
                Свяжитесь с нашей службой поддержки
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SoftButton variant="primary" size="lg">
                  <Mail size={20} className="mr-2" />
                  Написать в поддержку
                </SoftButton>
                <SoftButton variant="sky" size="lg">
                  <MessageCircle size={20} className="mr-2" />
                  Онлайн-чат
                </SoftButton>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
