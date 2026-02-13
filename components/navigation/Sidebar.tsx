'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, User, BookOpen, Wallet, MessageCircle, Heart,
  Users, Calendar, Trophy, ShoppingBag, Briefcase, Vote,
  Settings, Sun, Moon, GraduationCap, Library, Map, DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'
import { DoghouseIcon, PawIcon } from '@/components/icons/DogymorbisIcons'

const menuItems = [
  // Основные разделы
  { id: 'dashboard', label: 'Главная', icon: User, path: '/dashboard' },
  { id: 'map', label: 'Карта прогулок', icon: Map, path: '/map' },
  { id: 'feed', label: 'Лента', icon: MessageCircle, path: '/feed' },
  { id: 'account', label: 'Аккаунт & питомцы', icon: User, path: '/account' },
  { id: 'journal', label: 'Журнал', icon: BookOpen, path: '/journal' },
  { id: 'wallet', label: 'Кошелёк', icon: Wallet, path: '/wallet' },
  { id: 'messages', label: 'Сообщения', icon: MessageCircle, path: '/messages' },
  { id: 'dating', label: 'Друзья / Дейтинг', icon: Heart, path: '/dating' },
  { id: 'groups', label: 'Группы', icon: Users, path: '/groups' },
  { id: 'events', label: 'События', icon: Calendar, path: '/events' },
  { id: 'tasks', label: 'Задания', icon: Trophy, path: '/tasks' },
  { id: 'training', label: 'Тренировки', icon: GraduationCap, path: '/training' },
  { id: 'knowledge', label: 'База знаний', icon: Library, path: '/knowledge' },
  { id: 'store', label: 'Магазин', icon: ShoppingBag, path: '/store' },
  { id: 'partner', label: 'Партнёрская программа', icon: Briefcase, path: '/partner' },
  { id: 'dao', label: 'DAO / Управление', icon: Vote, path: '/dao' },
  // Информационные страницы
  { id: 'projecthub', label: 'ProjectHub', icon: Library, path: '/projecthub' },
  { id: 'economics', label: 'Экономика', icon: DollarSign, path: '/presentation/economics' },
  { id: 'presentation', label: 'Презентация', icon: BookOpen, path: '/presentation' },
  { id: 'whitepaper', label: 'Вайтпэпер', icon: BookOpen, path: '/whitepaper' },
  { id: 'about', label: 'О проекте', icon: User, path: '/about' },
  { id: 'investors', label: 'Инвесторам', icon: Briefcase, path: '/investors' },
  { id: 'help', label: 'Помощь', icon: Library, path: '/help' },
  { id: 'contact', label: 'Контакты', icon: MessageCircle, path: '/contact' },
  { id: 'settings', label: 'Настройки', icon: Settings, path: '/settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const handleNavigate = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-plush-cream border-r border-plush-graphite/10 z-[70] overflow-y-auto plush-depth-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-plush-graphite/10">
              <div className="flex items-center gap-3">
                <DoghouseIcon size={32} className="text-plush-primary" strokeWidth={2} />
                <div>
                  <h2 className="font-bold text-base text-plush-graphite">
                    Dogymorbis
                  </h2>
                  <p className="text-xs text-plush-graphite/60">
                    Гуляй, общайся, получай косточки
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-plush-cream-pressed touch-target transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-plush-graphite" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 plush-rounded-card transition-all duration-150 text-left touch-target',
                      isActive
                        ? 'bg-plush-primary/10 text-plush-primary font-semibold'
                        : 'text-plush-graphite hover:bg-plush-cream-pressed'
                    )}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarItem"
                        className="ml-auto w-1 h-6 bg-plush-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t border-plush-graphite/10">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 plush-rounded-card bg-plush-cream-pressed hover:bg-plush-cream-elevated transition-colors"
              >
                <span className="text-sm text-plush-graphite font-medium">
                  Тема оформления
                </span>
                <div className="flex items-center gap-2">
                  {theme === 'light' ? (
                    <Sun size={20} className="text-plush-yellow" />
                  ) : (
                    <Moon size={20} className="text-plush-primary" />
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 text-center border-t border-plush-graphite/10">
              <PawIcon size={32} className="mx-auto mb-2 text-plush-primary" />
              <p className="text-xs text-plush-graphite/60">
                © 2025 Dogymorbis
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

