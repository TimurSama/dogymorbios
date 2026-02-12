'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Building2, Store, Mail, Phone, MapPin, Check } from 'lucide-react'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { Input } from '@/components/ui/Input'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Воронка регистрации партнёра
 * Многошаговая форма для бизнеса
 */
export default function PartnerRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    website: '',
    plan: 'basic',
  })

  const totalSteps = 3
  const businessTypes = [
    'Зоомагазин',
    'Ветеринарная клиника',
    'Груминг-салон',
    'Кинологический центр',
    'Кафе для собак',
    'Отель для животных',
    'Другое',
  ]

  const plans = [
    {
      id: 'basic',
      name: 'Базовый',
      price: 'Бесплатно',
      features: [
        'Витрина до 20 товаров',
        'Базовая аналитика',
        'Отображение на карте',
        'Комиссия 15%',
      ],
    },
    {
      id: 'professional',
      name: 'Профессиональный',
      price: '2,990₽/мес',
      features: [
        'Неограниченные товары',
        'Расширенная аналитика',
        'Приоритет в поиске',
        'Комиссия 10%',
        'Маркетинговая поддержка',
      ],
      highlighted: true,
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: '9,990₽/мес',
      features: [
        'Всё из Профессионального',
        'API-доступ',
        'Баннеры в приложении',
        'Комиссия 5%',
        'Персональный менеджер',
      ],
    },
  ]

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push('/partner')
    }
  }

  const handleSubmit = () => {
    console.log('Регистрация партнёра:', formData)
    // Здесь будет логика регистрации партнёра
    router.push('/partner/dashboard')
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar 
        title="Стать партнёром"
        actions={
          <button onClick={handleBack} className="p-2">
            <ArrowLeft size={24} className="text-plush-graphite" />
          </button>
        }
      />

      <div className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Прогресс */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-plush-graphite/60">
                Шаг {step} из {totalSteps}
              </span>
              <span className="text-sm font-medium text-plush-graphite">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-plush-cream-pressed rounded-full h-2">
              <motion.div
                initial={false}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="bg-plush-primary h-2 rounded-full"
              />
            </div>
          </div>

          {/* Шаги */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SoftCard depth={1} className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <Building2 size={64} className="mx-auto mb-4 text-plush-primary" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      О вашем бизнесе
                    </h2>
                    <p className="text-plush-graphite/70">
                      Расскажите о вашей компании
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Название компании *
                      </label>
                      <Input
                        type="text"
                        placeholder="ООО 'Четыре лапы'"
                        value={formData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                        icon={<Building2 size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Тип бизнеса *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => updateField('businessType', e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-plush-card bg-white border border-plush-graphite/10 focus:outline-none focus:ring-2 focus:ring-plush-primary/30 text-plush-graphite"
                      >
                        <option value="">Выберите тип</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Описание
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="Расскажите о ваших услугах и товарах"
                        rows={4}
                        className="w-full px-4 py-3 rounded-plush-card bg-white border border-plush-graphite/10 focus:outline-none focus:ring-2 focus:ring-plush-primary/30 text-plush-graphite resize-none"
                      />
                    </div>
                  </div>
                </SoftCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SoftCard depth={1} className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <Mail size={64} className="mx-auto mb-4 text-plush-sky" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      Контактная информация
                    </h2>
                    <p className="text-plush-graphite/70">
                      Как с вами связаться?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="info@company.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        icon={<Mail size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Телефон *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        icon={<Phone size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Веб-сайт
                      </label>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-plush-graphite mb-2">
                          Город *
                        </label>
                        <Input
                          type="text"
                          placeholder="Москва"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          icon={<MapPin size={20} />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-plush-graphite mb-2">
                          Адрес
                        </label>
                        <Input
                          type="text"
                          placeholder="ул. Примерная, д. 1"
                          value={formData.address}
                          onChange={(e) => updateField('address', e.target.value)}
                          icon={<MapPin size={20} />}
                        />
                      </div>
                    </div>
                  </div>
                </SoftCard>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SoftCard depth={1} className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <Store size={64} className="mx-auto mb-4 text-plush-yellow" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      Выберите тариф
                    </h2>
                    <p className="text-plush-graphite/70">
                      Вы можете изменить тариф позже
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <motion.button
                        key={plan.id}
                        onClick={() => updateField('plan', plan.id)}
                        className="text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SoftCard
                          depth={plan.highlighted ? 2 : 1}
                          className={`p-6 h-full ${
                            formData.plan === plan.id
                              ? 'ring-2 ring-plush-primary'
                              : ''
                          }`}
                        >
                          {plan.highlighted && (
                            <div className="absolute top-4 right-4">
                              <span className="px-2 py-1 text-xs font-semibold bg-plush-primary text-white rounded-full">
                                Популярный
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-plush-graphite">
                              {plan.name}
                            </h3>
                            {formData.plan === plan.id && (
                              <Check size={20} className="text-plush-primary" />
                            )}
                          </div>
                          <p className="text-2xl font-bold text-plush-primary mb-4">
                            {plan.price}
                          </p>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-plush-graphite/70">
                                <Check size={16} className="text-plush-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </SoftCard>
                      </motion.button>
                    ))}
                  </div>
                </SoftCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Кнопки навигации */}
          <div className="flex gap-4 mt-6">
            <SoftButton
              variant="ghost"
              size="lg"
              onClick={handleBack}
              className="flex-1"
            >
              {step === 1 ? 'Отмена' : 'Назад'}
            </SoftButton>
            <SoftButton
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="flex-1"
              disabled={
                (step === 1 && (!formData.companyName || !formData.businessType)) ||
                (step === 2 && (!formData.email || !formData.phone || !formData.city)) ||
                (step === 3 && !formData.plan)
              }
            >
              {step === totalSteps ? 'Завершить регистрацию' : 'Далее'}
              {step < totalSteps && <ArrowRight size={20} className="ml-2" />}
            </SoftButton>
          </div>

          {/* Преимущества */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <SoftCard depth={1} className="p-6 bg-gradient-to-br from-plush-sky/10 to-plush-primary/10">
              <h3 className="text-lg font-semibold text-plush-graphite mb-4">
                Преимущества партнёрства
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Доступ к тысячам активных пользователей',
                  'Увеличение продаж на 30-50%',
                  'Простая интеграция за 15 минут',
                  'Реферальная программа с кэшбеком',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={20} className="text-plush-primary mt-0.5 flex-shrink-0" />
                    <span className="text-plush-graphite/70 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </SoftCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
