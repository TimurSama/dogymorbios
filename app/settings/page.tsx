'use client'

import { useState } from 'react'
import { 
  User, Lock, Bell, Globe, Palette, Shield, 
  Info, HelpCircle, LogOut, ChevronRight 
} from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useTheme } from '@/components/ThemeProvider'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    posts: true,
    messages: true,
    events: true,
    dao: false,
  })

  const settingsSections = [
    {
      title: 'Аккаунт',
      icon: User,
      items: [
        { id: 'profile', label: 'Профиль', description: 'Имя, фото, биография' },
        { id: 'pets', label: 'Питомцы', description: 'Управление питомцами' },
        { id: 'privacy', label: 'Приватность', description: 'Кто может видеть ваш профиль' },
      ],
    },
    {
      title: 'Безопасность',
      icon: Lock,
      items: [
        { id: 'password', label: 'Пароль', description: 'Изменить пароль' },
        { id: '2fa', label: 'Двухфакторная аутентификация', description: 'Защита аккаунта' },
        { id: 'sessions', label: 'Активные сеансы', description: 'Управление устройствами' },
      ],
    },
    {
      title: 'Уведомления',
      icon: Bell,
      items: [
        { id: 'push', label: 'Push-уведомления', description: 'Настроить уведомления' },
        { id: 'email', label: 'Email-рассылка', description: 'Новости и обновления' },
      ],
    },
    {
      title: 'Приложение',
      icon: Palette,
      items: [
        { id: 'theme', label: 'Тема оформления', description: theme === 'light' ? 'Светлая' : 'Тёмная', action: toggleTheme },
        { id: 'language', label: 'Язык', description: 'Русский' },
      ],
    },
    {
      title: 'Поддержка',
      icon: HelpCircle,
      items: [
        { id: 'help', label: 'Справка', description: 'Часто задаваемые вопросы' },
        { id: 'contact', label: 'Связаться с нами', description: 'Техподдержка' },
        { id: 'about', label: 'О приложении', description: 'Версия 1.0.0' },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-screen">
      <AppBar title="Настройки" showBack />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* User Card */}
          <Card className="p-6" elevation={2}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-sky flex items-center justify-center text-3xl">
                👩
              </div>
              <div className="flex-1">
                <h3 className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                  Анна Иванова
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                  @anna_dog_lover
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Редактировать
              </Button>
            </div>
          </Card>

          {/* Settings Sections */}
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Icon size={16} className="text-text-secondary-light dark:text-text-secondary-dark" />
                  <h3 className="text-body font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                    {section.title}
                  </h3>
                </div>
                <Card className="overflow-hidden" elevation={1}>
                  {section.items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-4 transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                        index < section.items.length - 1 ? 'border-b border-line-light dark:border-line-dark' : ''
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-body font-medium text-text-primary-light dark:text-text-primary-dark">
                          {item.label}
                        </p>
                        <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
                    </button>
                  ))}
                </Card>
              </div>
            )
          })}

          {/* Notifications Detail */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Bell size={16} className="text-text-secondary-light dark:text-text-secondary-dark" />
              <h3 className="text-body font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                Детальная настройка уведомлений
              </h3>
            </div>
            <Card className="p-4" elevation={1}>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels: {[k: string]: string} = {
                    posts: 'Новые посты от подписок',
                    messages: 'Новые сообщения',
                    events: 'Предстоящие события',
                    dao: 'Голосования DAO',
                  }
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-body text-text-primary-light dark:text-text-primary-dark">
                        {labels[key]}
                      </span>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          value ? 'bg-sky' : 'bg-surface2-light dark:bg-surface2-dark'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Danger Zone */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Shield size={16} className="text-danger" />
              <h3 className="text-body font-semibold text-danger uppercase tracking-wide">
                Опасная зона
              </h3>
            </div>
            <Card className="overflow-hidden" elevation={1}>
              <button className="w-full flex items-center justify-between p-4 transition-colors hover:bg-danger/5 border-b border-line-light dark:border-line-dark">
                <div className="text-left">
                  <p className="text-body font-medium text-danger">
                    Удалить аккаунт
                  </p>
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                    Безвозвратное удаление всех данных
                  </p>
                </div>
                <ChevronRight size={20} className="text-danger" />
              </button>
              <button className="w-full flex items-center justify-between p-4 transition-colors hover:bg-danger/5">
                <div className="text-left">
                  <p className="text-body font-medium text-danger">
                    Выйти из аккаунта
                  </p>
                  <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                    Выход на всех устройствах
                  </p>
                </div>
                <LogOut size={20} className="text-danger" />
              </button>
            </Card>
          </div>

          {/* App Info */}
          <Card className="p-4 text-center" elevation={1}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Info size={16} className="text-text-secondary-light dark:text-text-secondary-dark" />
              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                Dogymorbis v1.0.0
              </p>
            </div>
            <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
              © 2025 Dogymorbis. Все права защищены.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}


