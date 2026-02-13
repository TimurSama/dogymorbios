'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, User, BookOpen, Wallet, MessageCircle, Heart,
  Users, Calendar, Trophy, ShoppingBag, Briefcase, Vote,
  Settings, Sun, Moon, GraduationCap, Library, Map
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
            className="fixed top-0 left-0 bottom-0 w-80 bg-[var(--surface)] border-r border-[var(--outline)] z-[70] overflow-y-auto shadow-soft-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <DoghouseIcon size={32} className="text-blue-500" strokeWidth={2} />
                <div>
                  <h2 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    Dogymorbis
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Гуляй, общайся, получай косточки
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg state-layer touch-target"
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-[var(--text-primary)]" />
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
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 text-left state-layer touch-target',
                      isActive
                        ? 'bg-[var(--sky)]/10 text-[var(--sky)] font-semibold'
                        : 'text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
                    )}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarItem"
                        className="ml-auto w-1 h-6 bg-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  Тема оформления
                </span>
                <div className="flex items-center gap-2">
                  {theme === 'light' ? (
                    <Sun size={20} className="text-yellow-500" />
                  ) : (
                    <Moon size={20} className="text-blue-400" />
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 text-center border-t border-gray-200 dark:border-gray-700">
              <PawIcon size={32} className="mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                © 2025 Dogymorbis
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

