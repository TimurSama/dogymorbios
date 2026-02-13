'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, TrendingUp, Coins, BarChart3, Target, Calendar,
  Map, Users, Heart, BookOpen, ShoppingBag, Zap
} from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { WhitepaperPopup } from '@/components/whitepaper/WhitepaperPopup'
import { whitepaperSections, getRelatedSections } from '@/lib/whitepaper-data'

/**
 * Детальная презентация для инвесторов и партнёров
 * Полная информация об экосистеме, экономике, токеномике, рынке, инвестициях и дорожной карте
 */
export default function DetailedPresentationPage() {
  const [openPopup, setOpenPopup] = useState<string | null>(null)

  const sections = [
    {
      id: 'ecosystem',
      title: 'Экосистема',
      icon: <Building2 size={32} />,
      color: 'plush-primary',
      description: 'Полное описание всех модулей и их взаимосвязей',
    },
    {
      id: 'tokenomics',
      title: 'Косточкономика',
      icon: <Coins size={32} />,
      color: 'plush-yellow',
      description: 'Детальная экономическая модель BoneCoin',
    },
    {
      id: 'business-model',
      title: 'Экономика',
      icon: <BarChart3 size={32} />,
      color: 'plush-primary',
      description: 'Бизнес-модель и источники дохода',
    },
    {
      id: 'market',
      title: 'Рынок',
      icon: <TrendingUp size={32} />,
      color: 'plush-sky',
      description: 'Анализ рынка и целевая аудитория',
    },
    {
      id: 'investment',
      title: 'Инвестиционный план',
      icon: <Target size={32} />,
      color: 'plush-primary',
      description: 'Требуемые инвестиции и использование средств',
    },
    {
      id: 'roadmap',
      title: 'Дорожная карта',
      icon: <Calendar size={32} />,
      color: 'plush-sky',
      description: 'Детальная roadmap на 2-3 года',
    },
  ]

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
      <AppBar title="Детальная презентация" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Детальная презентация Dogymorbis
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Полная информация об экосистеме, экономике и планах развития
            </p>
          </motion.div>

          {/* Секции */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, i) => {
              const sectionData = whitepaperSections[section.id]
              const related = getRelatedSections(section.id)

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard
                    depth={1}
                    interactive
                    hover
                    className="p-6 h-full cursor-pointer"
                    onClick={() => handleOpenPopup(section.id)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-${section.color}/10 flex items-center justify-center mb-4 text-${section.color}`}>
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                      {section.title}
                    </h3>
                    <p className="text-plush-graphite/70 text-sm mb-4">
                      {section.description}
                    </p>
                    <SoftButton
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenPopup(section.id)
                      }}
                      className="w-full"
                    >
                      Подробнее
                    </SoftButton>
                  </SoftCard>
                </motion.div>
              )
            })}
          </div>

          {/* Дополнительная информация */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SoftCard depth={1} className="p-6 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
              <h3 className="text-xl font-semibold text-plush-graphite mb-4">
                Дополнительные материалы
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <SoftButton
                  variant="primary"
                  size="md"
                  onClick={() => window.open('/dogymorbis_вайтпепер_whitepaper.md', '_blank')}
                  className="w-full"
                >
                  Открыть полный вайтпэпер
                </SoftButton>
                <SoftButton
                  variant="sky"
                  size="md"
                  onClick={() => window.open('/ПЛАН_ДОРАБОТКИ_ПРИЛОЖЕНИЯ.md', '_blank')}
                  className="w-full"
                >
                  План доработки
                </SoftButton>
              </div>
            </SoftCard>
          </motion.div>
        </div>
      </div>

      {/* Попапы */}
      {sections.map((section) => {
        const sectionData = whitepaperSections[section.id]
        if (!sectionData) return null

        const related = getRelatedSections(section.id)

        return (
          <WhitepaperPopup
            key={section.id}
            isOpen={openPopup === section.id}
            onClose={handleClosePopup}
            title={sectionData.title}
            icon={sectionData.icon}
            content={sectionData.content}
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
