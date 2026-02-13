'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Target, BarChart3, ArrowRight } from 'lucide-react'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { WhitepaperPopup } from '@/components/whitepaper/WhitepaperPopup'
import { whitepaperSections, getRelatedSections } from '@/lib/whitepaper-data'
import { AppBar } from '@/components/navigation/AppBar'
import { useState } from 'react'

/**
 * Страница для инвесторов
 */
export default function InvestorsPage() {
  const [openPopup, setOpenPopup] = useState<string | null>(null)

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
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Инвесторам" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Инвестиционное предложение
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Присоединяйтесь к растущей экосистеме для владельцев собак
            </p>
          </motion.div>

          {/* Ключевые метрики */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Рынок', value: '$152B', icon: DollarSign, popupId: 'market' },
              { label: 'Рост', value: '+3.3%', icon: TrendingUp, popupId: 'business-model' },
              { label: 'Целевая аудитория', value: '68M+', icon: Target, popupId: 'market' },
              { label: 'Прогноз доходов', value: '$25M', icon: BarChart3, popupId: 'business-model' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SoftCard
                  depth={1}
                  interactive
                  hover
                  className="p-6 text-center cursor-pointer"
                  onClick={() => metric.popupId && handleOpenPopup(metric.popupId)}
                >
                  <metric.icon size={32} className="mx-auto mb-3 text-plush-primary" />
                  <p className="text-2xl font-bold text-plush-graphite mb-1">{metric.value}</p>
                  <p className="text-sm text-plush-graphite/60">{metric.label}</p>
                </SoftCard>
              </motion.div>
            ))}
          </div>

          {/* Инвестиционные возможности */}
          <div className="grid md:grid-cols-2 gap-6">
            <SoftCard depth={1} className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-plush-graphite mb-4">
                Почему инвестировать?
              </h2>
              <ul className="space-y-3 text-plush-graphite/70">
                <li className="flex items-start gap-2">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>Огромный и растущий рынок ($152B в 2024)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>Уникальное предложение — первая комплексная платформа</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>Множественные источники дохода</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>Масштабируемая бизнес-модель</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>Сильная команда и видение</span>
                </li>
              </ul>
            </SoftCard>

            <SoftCard depth={1} className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-plush-graphite mb-4">
                Использование инвестиций
              </h2>
              <div className="space-y-3">
                {[
                  { category: 'Разработка', percent: 40 },
                  { category: 'Маркетинг', percent: 30 },
                  { category: 'Операции', percent: 20 },
                  { category: 'Резерв', percent: 10 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-plush-graphite">{item.category}</span>
                      <span className="font-semibold text-plush-primary">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                      <div
                        className="bg-plush-primary h-2 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Детальная информация */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Детальная информация
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: 'ecosystem', title: 'Экосистема', desc: 'Все модули платформы' },
                { id: 'tokenomics', title: 'Токеномика', desc: 'BoneCoin экономика' },
                { id: 'business-model', title: 'Бизнес-модель', desc: 'Источники дохода' },
                { id: 'market', title: 'Рынок', desc: 'Анализ и потенциал' },
                { id: 'investment', title: 'Инвестиции', desc: 'План и использование' },
                { id: 'roadmap', title: 'Дорожная карта', desc: 'План развития' },
              ].map((section, i) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleOpenPopup(section.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-left"
                >
                  <SoftCard depth={1} interactive hover className="p-4">
                    <h3 className="font-semibold text-plush-graphite mb-1">{section.title}</h3>
                    <p className="text-sm text-plush-graphite/60 mb-2">{section.desc}</p>
                    <div className="flex items-center gap-1 text-plush-primary text-sm">
                      <span>Подробнее</span>
                      <ArrowRight size={16} />
                    </div>
                  </SoftCard>
                </motion.button>
              ))}
            </div>
          </SoftCard>

          {/* CTA */}
          <SoftCard depth={2} className="p-6 md:p-8 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-plush-graphite">
                Готовы инвестировать?
              </h2>
              <p className="text-plush-graphite/70">
                Свяжитесь с нами для обсуждения условий
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SoftButton variant="primary" size="lg">
                  Связаться с нами
                </SoftButton>
                <SoftButton
                  variant="sky"
                  size="lg"
                  onClick={() => handleOpenPopup('investment')}
                >
                  Инвестиционный план
                </SoftButton>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>

      {/* Попапы */}
      {['ecosystem', 'tokenomics', 'business-model', 'market', 'investment', 'roadmap'].map((id) => {
        const section = whitepaperSections[id]
        if (!section) return null

        const related = getRelatedSections(id)

        return (
          <WhitepaperPopup
            key={id}
            isOpen={openPopup === id}
            onClose={handleClosePopup}
            title={section.title}
            icon={section.icon}
            content={section.content}
            relatedPopups={related.map((rel) => ({
              title: rel.title,
              onClick: () => handleOpenRelated(rel.id),
            }))}
          />
        )
      })}
    </div>
  )
}
