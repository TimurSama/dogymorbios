'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Bell, Lock, Shield, Palette, Globe, 
  Mail, Smartphone, Trash2, LogOut, Save,
  Eye, EyeOff, Moon, Sun
} from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { Input } from '@/components/ui/Input'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Страница настроек
 * Полная настройка аккаунта и приложения
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'security', label: 'Безопасность', icon: Lock },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'privacy', label: 'Приватность', icon: Shield },
    { id: 'appearance', label: 'Внешний вид', icon: Palette },
    { id: 'language', label: 'Язык', icon: Globe },
  ]

  const [profileData, setProfileData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    bio: 'Люблю прогулки с собакой',
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  })

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    newFollowers: true,
    newMessages: true,
    walkReminders: true,
    eventReminders: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showWalkHistory: true,
    allowMessages: 'everyone',
  })

  const handleSave = () => {
    // Логика сохранения
    console.log('Сохранение настроек')
  }

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Настройки" />

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Вкладки */}
          <div className="flex gap-2 mb-6 overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-plush-card whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-plush-primary text-white'
                      : 'bg-white text-plush-graphite hover:bg-plush-cream-pressed'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Контент вкладок */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Профиль
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Имя"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <Input
                    label="Телефон"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-plush-graphite mb-2">
                      О себе
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 plush-rounded-card bg-white text-plush-graphite border border-plush-graphite/10 focus:outline-none focus:ring-2 focus:ring-plush-primary/30 focus:border-plush-primary transition-all resize-none"
                    />
                  </div>
                  <SoftButton variant="primary" size="lg" onClick={handleSave} className="w-full">
                    <Save size={20} className="mr-2" />
                    Сохранить изменения
                  </SoftButton>
                </div>
              </SoftCard>
            )}

            {activeTab === 'security' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Безопасность
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Текущий пароль"
                    type={showPassword ? 'text' : 'password'}
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    icon={
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-plush-graphite/40 hover:text-plush-graphite"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    }
                  />
                  <Input
                    label="Новый пароль"
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  />
                  <Input
                    label="Подтвердите пароль"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  />
                  <SoftCard depth={1} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-plush-graphite mb-1">
                          Двухфакторная аутентификация
                        </h3>
                        <p className="text-sm text-plush-graphite/60">
                          Дополнительная защита вашего аккаунта
                        </p>
                      </div>
                      <button
                        onClick={() => setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          securityData.twoFactorEnabled ? 'bg-plush-primary' : 'bg-plush-graphite/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </SoftCard>
                  <SoftButton variant="primary" size="lg" onClick={handleSave} className="w-full">
                    Сохранить изменения
                  </SoftButton>
                </div>
              </SoftCard>
            )}

            {activeTab === 'notifications' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Уведомления
                </h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <SoftCard key={key} depth={1} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-plush-graphite mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-plush-graphite/60">
                            {key === 'push' && 'Push-уведомления в приложении'}
                            {key === 'email' && 'Уведомления на email'}
                            {key === 'sms' && 'SMS-уведомления'}
                            {key === 'newFollowers' && 'Новые подписчики'}
                            {key === 'newMessages' && 'Новые сообщения'}
                            {key === 'walkReminders' && 'Напоминания о прогулках'}
                            {key === 'eventReminders' && 'Напоминания о событиях'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-plush-primary' : 'bg-plush-graphite/20'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    </SoftCard>
                  ))}
                </div>
              </SoftCard>
            )}

            {activeTab === 'privacy' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Приватность
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-plush-graphite mb-2">
                      Видимость профиля
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                      className="w-full px-4 py-3 plush-rounded-card bg-white text-plush-graphite border border-plush-graphite/10 focus:outline-none focus:ring-2 focus:ring-plush-primary/30"
                    >
                      <option value="public">Публичный</option>
                      <option value="friends">Только друзья</option>
                      <option value="private">Приватный</option>
                    </select>
                  </div>
                  <SoftCard depth={1} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-plush-graphite mb-1">
                          Показывать местоположение
                        </h3>
                        <p className="text-sm text-plush-graphite/60">
                          Отображать вашу геопозицию на карте
                        </p>
                      </div>
                      <button
                        onClick={() => setPrivacy({ ...privacy, showLocation: !privacy.showLocation })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          privacy.showLocation ? 'bg-plush-primary' : 'bg-plush-graphite/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            privacy.showLocation ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </SoftCard>
                  <SoftButton variant="primary" size="lg" onClick={handleSave} className="w-full">
                    Сохранить изменения
                  </SoftButton>
                </div>
              </SoftCard>
            )}

            {activeTab === 'appearance' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Внешний вид
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-plush-graphite mb-4">
                      Тема
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Светлая', icon: Sun },
                        { value: 'dark', label: 'Тёмная', icon: Moon },
                        { value: 'auto', label: 'Авто', icon: Globe },
                      ].map((option) => {
                        const Icon = option.icon
                        return (
                          <button
                            key={option.value}
                            onClick={() => setTheme(option.value as any)}
                            className={`p-4 rounded-plush-card border-2 transition-all ${
                              theme === option.value
                                ? 'border-plush-primary bg-plush-primary/10'
                                : 'border-plush-graphite/10 bg-white'
                            }`}
                          >
                            <Icon size={32} className="mx-auto mb-2 text-plush-primary" />
                            <p className="font-medium text-plush-graphite">{option.label}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </SoftCard>
            )}

            {activeTab === 'language' && (
              <SoftCard depth={1} className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                  Язык
                </h2>
                <div className="space-y-3">
                  {['Русский', 'English', 'Deutsch', 'Français'].map((lang) => (
                    <button
                      key={lang}
                      className="w-full p-4 rounded-plush-card bg-white border border-plush-graphite/10 hover:border-plush-primary transition-all text-left"
                    >
                      <p className="font-medium text-plush-graphite">{lang}</p>
                    </button>
                  ))}
                </div>
              </SoftCard>
            )}
          </motion.div>

          {/* Опасная зона */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <SoftCard depth={1} className="p-6 border-2 border-plush-alert/20">
              <h2 className="text-xl font-semibold text-plush-alert mb-4">
                Опасная зона
              </h2>
              <div className="space-y-4">
                <SoftButton
                  variant="ghost"
                  size="lg"
                  className="w-full text-plush-alert hover:bg-plush-alert/10"
                >
                  <Trash2 size={20} className="mr-2" />
                  Удалить аккаунт
                </SoftButton>
                <SoftButton
                  variant="ghost"
                  size="lg"
                  className="w-full text-plush-graphite hover:bg-plush-graphite/10"
                >
                  <LogOut size={20} className="mr-2" />
                  Выйти из аккаунта
                </SoftButton>
              </div>
            </SoftCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
