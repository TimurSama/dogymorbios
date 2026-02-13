'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, FileText } from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { Input } from '@/components/ui/Input'
import { WhitepaperPopup } from '@/components/whitepaper/WhitepaperPopup'
import { whitepaperSections, getRelatedSections } from '@/lib/whitepaper-data'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Страница вайтпэпера
 * Полный доступ ко всей информации
 */
export default function WhitepaperPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openPopup, setOpenPopup] = useState<string | null>(null)

  const allSections = Object.values(whitepaperSections)

  const filteredSections = searchQuery
    ? allSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.stringify(section.content).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSections

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
      <AppBar title="Вайтпэпер" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <BookOpen size={80} className="mx-auto text-plush-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Вайтпэпер Dogymorbis
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Полная документация проекта, экономики и планов развития
            </p>
          </motion.div>

          {/* Поиск */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-plush-graphite/40" />
              <Input
                type="text"
                placeholder="Поиск по вайтпэперу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Содержание */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Содержание
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSections.map((section, i) => {
                const related = getRelatedSections(section.id)

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <SoftCard
                      depth={1}
                      interactive
                      hover
                      className="p-6 cursor-pointer h-full"
                      onClick={() => handleOpenPopup(section.id)}
                    >
                      <div className="mb-4">{section.icon}</div>
                      <h3 className="text-lg font-semibold text-plush-graphite mb-2">
                        {section.title}
                      </h3>
                      {related.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {related.slice(0, 2).map((rel) => (
                            <span
                              key={rel.id}
                              className="px-2 py-1 text-xs bg-plush-primary/10 text-plush-primary rounded-full"
                            >
                              {rel.title}
                            </span>
                          ))}
                        </div>
                      )}
                      <SoftButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenPopup(section.id)
                        }}
                        className="w-full mt-4"
                      >
                        Читать
                      </SoftButton>
                    </SoftCard>
                  </motion.div>
                )
              })}
            </div>

            {filteredSections.length === 0 && (
              <SoftCard depth={1} className="p-8 text-center">
                <Search size={48} className="mx-auto mb-4 text-plush-graphite/40" />
                <p className="text-plush-graphite/70">
                  Ничего не найдено по запросу &quot;{searchQuery}&quot;
                </p>
              </SoftCard>
            )}
          </div>

          {/* Скачать PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SoftCard depth={2} className="p-6 md:p-8 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-plush-graphite mb-2">
                    Полная версия вайтпэпера
                  </h3>
                  <p className="text-plush-graphite/70">
                    Скачайте PDF-версию для детального изучения
                  </p>
                </div>
                <SoftButton
                  variant="primary"
                  size="lg"
                  onClick={() => window.open('/dogymorbis_вайтпепер_whitepaper.md', '_blank')}
                >
                  <FileText size={20} className="mr-2" />
                  Скачать PDF
                </SoftButton>
              </div>
            </SoftCard>
          </motion.div>
        </div>
      </div>

      {/* Попапы */}
      {allSections.map((section) => {
        const related = getRelatedSections(section.id)

        return (
          <WhitepaperPopup
            key={section.id}
            isOpen={openPopup === section.id}
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
