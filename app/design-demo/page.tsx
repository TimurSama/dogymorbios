'use client'

import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { motion } from 'framer-motion'
import { BoneIcon, DoghouseIcon } from '@/components/icons/DogymorbisIcons'

/**
 * Демо-страница нового дизайна "Плюшевый неоморфизм"
 * Демонстрирует все принципы нового визуального языка
 */
export default function DesignDemoPage() {
  return (
    <div className="min-h-screen bg-plush-cream p-8 safe-area-top safe-area-bottom">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-semibold text-plush-graphite">
            Плюшевый неоморфизм
          </h1>
          <p className="text-plush-graphite/70 text-lg">
            Мягкий, живой и физический визуальный язык
          </p>
        </motion.div>

        {/* Система глубины */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Система глубины (4 уровня)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SoftCard depth={0} className="p-6 text-center">
              <p className="text-sm text-plush-graphite/60">Level 0</p>
              <p className="text-plush-graphite font-medium mt-2">Фон</p>
            </SoftCard>
            <SoftCard depth={1} className="p-6 text-center">
              <p className="text-sm text-plush-graphite/60">Level 1</p>
              <p className="text-plush-graphite font-medium mt-2">Карточки</p>
            </SoftCard>
            <SoftCard depth={2} className="p-6 text-center">
              <p className="text-sm text-plush-graphite/60">Level 2</p>
              <p className="text-plush-graphite font-medium mt-2">Кнопки</p>
            </SoftCard>
            <SoftCard depth={3} className="p-6 text-center">
              <p className="text-sm text-plush-graphite/60">Level 3</p>
              <p className="text-plush-graphite font-medium mt-2">Модальные окна</p>
            </SoftCard>
          </div>
        </section>

        {/* Кнопки */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Кнопки (Pill shape)
          </h2>
          <div className="flex flex-wrap gap-4">
            <SoftButton variant="primary" size="md">
              Primary
            </SoftButton>
            <SoftButton variant="sky" size="md">
              Sky
            </SoftButton>
            <SoftButton variant="yellow" size="md">
              Yellow
            </SoftButton>
            <SoftButton variant="cream" size="md">
              Cream
            </SoftButton>
            <SoftButton variant="ghost" size="md">
              Ghost
            </SoftButton>
          </div>
          <div className="flex flex-wrap gap-4">
            <SoftButton variant="primary" size="sm">
              Small
            </SoftButton>
            <SoftButton variant="primary" size="md">
              Medium
            </SoftButton>
            <SoftButton variant="primary" size="lg">
              Large
            </SoftButton>
          </div>
        </section>

        {/* Карточки с разными цветами */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Карточки с разными цветами
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SoftCard color="cream" depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                Cream Card
              </h3>
              <p className="text-plush-graphite/70">
                Карточка с кремовым фоном и объёмным эффектом
              </p>
            </SoftCard>
            <SoftCard color="white" depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                White Card
              </h3>
              <p className="text-plush-graphite/70">
                Карточка с белым фоном и мягкими тенями
              </p>
            </SoftCard>
            <SoftCard color="sky" depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                Sky Card
              </h3>
              <p className="text-plush-graphite/70">
                Карточка с небесным оттенком
              </p>
            </SoftCard>
            <SoftCard color="yellow" depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                Yellow Card
              </h3>
              <p className="text-plush-graphite/70">
                Карточка с тёплым жёлтым оттенком
              </p>
            </SoftCard>
          </div>
        </section>

        {/* Интерактивные карточки */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Интерактивные карточки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SoftCard 
              depth={1} 
              interactive 
              hover
              className="p-6 text-center"
            >
              <DoghouseIcon size={48} className="mx-auto mb-4 text-plush-primary" />
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                Интерактивная
              </h3>
              <p className="text-plush-graphite/70 text-sm">
                Наведите курсор или нажмите
              </p>
            </SoftCard>
            <SoftCard 
              depth={2} 
              interactive 
              hover
              className="p-6 text-center"
            >
              <BoneIcon size={48} className="mx-auto mb-4 text-plush-yellow" />
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                С глубиной Level 2
              </h3>
              <p className="text-plush-graphite/70 text-sm">
                Более выраженный объём
              </p>
            </SoftCard>
            <SoftCard 
              depth={1} 
              interactive 
              hover
              rounded="card-lg"
              className="p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-plush-sky mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-lg font-medium text-plush-graphite mb-2">
                Большое скругление
              </h3>
              <p className="text-plush-graphite/70 text-sm">
                24px border-radius
              </p>
            </SoftCard>
          </div>
        </section>

        {/* Анимации */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Тактильные анимации
          </h2>
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="plush-bounce plush-depth-1 plush-rounded-card p-6 bg-plush-yellow cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-plush-graphite font-medium">Подпрыгивание</p>
            </motion.div>
            <motion.div
              className="plush-grow plush-depth-1 plush-rounded-card p-6 bg-plush-sky cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-plush-graphite font-medium">Плавное увеличение</p>
            </motion.div>
            <motion.div
              className="plush-press plush-depth-2 plush-rounded-card p-6 bg-plush-primary text-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <p className="font-medium">Вдавливание</p>
            </motion.div>
          </div>
        </section>

        {/* Принципы дизайна */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-plush-graphite">
            Принципы дизайна
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-3">
                Мягкий объект в реальном свете
              </h3>
              <ul className="space-y-2 text-plush-graphite/70 text-sm">
                <li>• Ткань, плюш, резиновая игрушка</li>
                <li>• Источник света сверху слева</li>
                <li>• Мягкая рассеянная тень</li>
                <li>• Внутренний свет (inner highlight)</li>
              </ul>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-3">
                Формула объёма
              </h3>
              <ul className="space-y-2 text-plush-graphite/70 text-sm">
                <li>• Внешняя светлая тень (30% белый)</li>
                <li>• Внешняя тёмная тень (8-12% чёрный)</li>
                <li>• Внутренний градиент (2-4% разница)</li>
                <li>• Микро-текстура (2-3% прозрачности)</li>
              </ul>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-3">
                Цвет как материал
              </h3>
              <ul className="space-y-2 text-plush-graphite/70 text-sm">
                <li>• Base (основной цвет)</li>
                <li>• Pressed (темнее на 6-8%)</li>
                <li>• Elevated (светлее на 4%)</li>
                <li>• Никаких чистых #FFFFFF и #000000</li>
              </ul>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h3 className="text-lg font-medium text-plush-graphite mb-3">
                Премиальность через сдержанность
              </h3>
              <ul className="space-y-2 text-plush-graphite/70 text-sm">
                <li>• Минимализм</li>
                <li>• Спокойные анимации (150-250ms)</li>
                <li>• Мягкие формы</li>
                <li>• Ограниченная палитра</li>
              </ul>
            </SoftCard>
          </div>
        </section>
      </div>
    </div>
  )
}
