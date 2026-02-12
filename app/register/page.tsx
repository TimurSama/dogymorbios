'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, User, Dog, Mail, Lock, Phone } from 'lucide-react'
import { DoghouseIcon, BoneIcon } from '@/components/icons/DogymorbisIcons'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { Input } from '@/components/ui/Input'
import { AppBar } from '@/components/navigation/AppBar'

/**
 * Воронка регистрации
 * Многошаговая форма с прогрессом
 */
export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    dogAge: '',
  })

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Завершение регистрации
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push('/landing')
    }
  }

  const handleSubmit = () => {
    // Здесь будет логика регистрации
    console.log('Регистрация:', formData)
    router.push('/dashboard')
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar 
        title="Регистрация"
        actions={
          <button onClick={handleBack} className="p-2">
            <ArrowLeft size={24} className="text-plush-graphite" />
          </button>
        }
      />

      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
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
                    <User size={64} className="mx-auto mb-4 text-plush-primary" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      Создайте аккаунт
                    </h2>
                    <p className="text-plush-graphite/70">
                      Начните с базовой информации
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        icon={<Mail size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Пароль
                      </label>
                      <Input
                        type="password"
                        placeholder="Минимум 8 символов"
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        icon={<Lock size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Подтвердите пароль
                      </label>
                      <Input
                        type="password"
                        placeholder="Повторите пароль"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        icon={<Lock size={20} />}
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
                    <User size={64} className="mx-auto mb-4 text-plush-sky" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      О себе
                    </h2>
                    <p className="text-plush-graphite/70">
                      Расскажите немного о себе
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Ваше имя
                      </label>
                      <Input
                        type="text"
                        placeholder="Иван"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        icon={<User size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Телефон
                      </label>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        icon={<Phone size={20} />}
                      />
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
                    <Dog size={64} className="mx-auto mb-4 text-plush-yellow" />
                    <h2 className="text-2xl font-bold text-plush-graphite mb-2">
                      О вашей собаке
                    </h2>
                    <p className="text-plush-graphite/70">
                      Добавьте информацию о питомце
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Кличка собаки
                      </label>
                      <Input
                        type="text"
                        placeholder="Бобик"
                        value={formData.dogName}
                        onChange={(e) => updateField('dogName', e.target.value)}
                        icon={<Dog size={20} />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Порода
                      </label>
                      <Input
                        type="text"
                        placeholder="Лабрадор"
                        value={formData.dogBreed}
                        onChange={(e) => updateField('dogBreed', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-plush-graphite mb-2">
                        Возраст
                      </label>
                      <Input
                        type="text"
                        placeholder="3 года"
                        value={formData.dogAge}
                        onChange={(e) => updateField('dogAge', e.target.value)}
                      />
                    </div>
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
            >
              {step === totalSteps ? 'Завершить' : 'Далее'}
              {step < totalSteps && <ArrowRight size={20} className="ml-2" />}
            </SoftButton>
          </div>

          {/* Условия использования */}
          <p className="text-center text-sm text-plush-graphite/60 mt-6">
            Регистрируясь, вы соглашаетесь с{' '}
            <a href="#" className="text-plush-primary hover:underline">
              условиями использования
            </a>
            {' '}и{' '}
            <a href="#" className="text-plush-primary hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
