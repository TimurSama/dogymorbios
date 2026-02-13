'use client'

import { motion } from 'framer-motion'
import { Users, Target, Award, Heart } from 'lucide-react'
import { DoghouseIcon } from '@/components/icons/DogymorbisIcons'
import { SoftCard } from '@/components/ui/SoftCard'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Страница "О проекте"
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="О проекте" />

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <DoghouseIcon size={80} className="mx-auto text-plush-primary" />
            <h1 className="text-4xl font-bold text-plush-graphite">
              О Dogymorbis
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Единая платформа для владельцев собак
            </p>
          </motion.div>

          {/* История */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-4">
              История создания
            </h2>
            <p className="text-plush-graphite/70 mb-4">
              Dogymorbis был создан в 2024 году с целью объединить всех владельцев собак в единое сообщество.
            </p>
            <p className="text-plush-graphite/70">
              Мы заметили, что владельцы собак вынуждены использовать множество разных приложений для разных задач.
              Наша миссия — создать единую платформу, которая объединяет всё необходимое для жизни с собакой.
            </p>
          </SoftCard>

          {/* Миссия и видение */}
          <div className="grid md:grid-cols-2 gap-6">
            <SoftCard depth={1} className="p-6">
              <Target size={48} className="text-plush-primary mb-4" />
              <h3 className="text-xl font-semibold text-plush-graphite mb-3">
                Миссия
              </h3>
              <p className="text-plush-graphite/70">
                Сделать прогулки, уход, обучение и общение с собаками безопаснее и интереснее,
                объединяя владельцев собак, профессиональных партнёров и инвесторов в одной экосистеме.
              </p>
            </SoftCard>

            <SoftCard depth={1} className="p-6">
              <Heart size={48} className="text-plush-alert mb-4" />
              <h3 className="text-xl font-semibold text-plush-graphite mb-3">
                Видение
              </h3>
              <p className="text-plush-graphite/70">
                Стать крупнейшей платформой для владельцев собак в мире, объединяющей миллионы пользователей
                и создающей новую экономику вокруг заботы о питомцах.
              </p>
            </SoftCard>
          </div>

          {/* Команда */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Команда
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Основатель', role: 'CEO & Founder', desc: 'Опыт в разработке и бизнесе' },
                { name: 'Разработчик', role: 'CTO', desc: 'Full-stack разработка' },
                { name: 'Дизайнер', role: 'Head of Design', desc: 'UX/UI дизайн' },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-plush-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users size={40} className="text-plush-primary" />
                    </div>
                    <h4 className="font-semibold text-plush-graphite mb-1">{member.name}</h4>
                    <p className="text-sm text-plush-primary mb-2">{member.role}</p>
                    <p className="text-xs text-plush-graphite/60">{member.desc}</p>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </SoftCard>

          {/* Достижения */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Достижения
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Запуск MVP', desc: '2024 Q4' },
                { title: 'Первые пользователи', desc: '1,000+ регистраций' },
                { title: 'Партнёры', desc: '50+ компаний' },
                { title: 'Инвестиции', desc: 'Seed раунд' },
              ].map((achievement, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-plush-cream-pressed rounded-plush-card">
                  <Award size={32} className="text-plush-yellow" />
                  <div>
                    <p className="font-semibold text-plush-graphite">{achievement.title}</p>
                    <p className="text-sm text-plush-graphite/60">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
