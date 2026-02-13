'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { SoftButton } from '@/components/ui/SoftButton'
import { Input } from '@/components/ui/Input'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Страница контактов
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Отправка формы:', formData)
    // Здесь будет логика отправки формы
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Контакты" />

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold text-plush-graphite">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Мы всегда рады помочь и ответить на ваши вопросы
            </p>
          </motion.div>

          {/* Контактная информация */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: 'Email', value: 'info@dogymorbis.com', link: 'mailto:info@dogymorbis.com' },
              { icon: Phone, label: 'Телефон', value: '+7 (999) 123-45-67', link: 'tel:+79991234567' },
              { icon: MapPin, label: 'Адрес', value: 'Москва, Россия', link: '#' },
            ].map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SoftCard depth={1} className="p-6 text-center">
                  <contact.icon size={32} className="mx-auto mb-3 text-plush-primary" />
                  <p className="text-sm text-plush-graphite/60 mb-1">{contact.label}</p>
                  <a
                    href={contact.link}
                    className="font-semibold text-plush-graphite hover:text-plush-primary transition-colors"
                  >
                    {contact.value}
                  </a>
                </SoftCard>
              </motion.div>
            ))}
          </div>

          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SoftCard depth={1} className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
                Отправить сообщение
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Ваше имя"
                    placeholder="Иван"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Тема"
                  placeholder="Вопрос о приложении"
                  value={formData.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-plush-graphite mb-2">
                    Сообщение
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Ваше сообщение..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 plush-rounded-card bg-white text-plush-graphite border border-plush-graphite/10 focus:outline-none focus:ring-2 focus:ring-plush-primary/30 focus:border-plush-primary transition-all resize-none"
                  />
                </div>
                <SoftButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <Send size={20} className="mr-2" />
                  Отправить сообщение
                </SoftButton>
              </form>
            </SoftCard>
          </motion.div>

          {/* Социальные сети */}
          <SoftCard depth={1} className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-4">
              Социальные сети
            </h2>
            <p className="text-plush-graphite/70 mb-6">
              Следите за новостями и обновлениями
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Telegram', icon: <MessageCircle size={24} /> },
                { name: 'VK', icon: <MessageCircle size={24} /> },
                { name: 'Instagram', icon: <MessageCircle size={24} /> },
              ].map((social, i) => (
                <SoftButton
                  key={i}
                  variant="ghost"
                  size="md"
                  className="flex items-center gap-2"
                >
                  {social.icon}
                  {social.name}
                </SoftButton>
              ))}
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
