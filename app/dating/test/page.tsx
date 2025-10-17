'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getDogsByUserId, Dog, getUserProfile, saveUserProfile, getDogProfile, saveDogProfile } from '@/lib/db'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { motion } from 'framer-motion'

const userQuestions = {
  interests: {
    title: 'Ваши интересы',
    options: ['Спорт', 'Походы', 'Фотография', 'Музыка', 'Путешествия', 'Чтение', 'Кулинария', 'Йога'],
  },
  activity: {
    title: 'Предпочитаемая активность',
    options: ['Активный отдых', 'Спокойные прогулки', 'Игры в парке', 'Пробежки', 'Походы в горы', 'Пляжный отдых'],
  },
  personality: {
    title: 'Ваша личность',
    options: ['Общительный', 'Спокойный', 'Энергичный', 'Дружелюбный', 'Ответственный', 'Веселый'],
  },
  lookingFor: {
    title: 'Ищете компанию для',
    options: ['Совместных прогулок', 'Тренировок', 'Игр с собаками', 'Путешествий', 'Общения', 'Мероприятий'],
  },
}

const dogQuestions = {
  energyLevel: {
    title: 'Уровень энергии собаки',
    description: '1 - очень спокойная, 5 - гиперактивная',
    type: 'scale' as const,
    min: 1,
    max: 5,
  },
  sociability: {
    title: 'Социальность с другими собаками',
    description: '1 - избегает контакта, 5 - обожает всех',
    type: 'scale' as const,
    min: 1,
    max: 5,
  },
  training: {
    title: 'Уровень дрессировки',
    description: '1 - не обучена, 5 - отлично дрессирована',
    type: 'scale' as const,
    min: 1,
    max: 5,
  },
  playStyle: {
    title: 'Стиль игры',
    options: ['Бег и догонялки', 'Борьба', 'Апортировка', 'Интеллектуальные игры', 'Спокойные игры', 'Игра в воде'],
  },
  favoriteActivities: {
    title: 'Любимые занятия',
    options: ['Плавание', 'Бег', 'Копание', 'Обнюхивание', 'Игра с мячом', 'Общение с другими собаками', 'Отдых'],
  },
}

export default function DatingTestPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<'user' | 'selectDog' | 'dog'>('user')
  const [dogs, setDogs] = useState<Dog[]>([])
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null)
  
  // User answers
  const [userAnswers, setUserAnswers] = useState({
    interests: [] as string[],
    activity: [] as string[],
    personality: [] as string[],
    lookingFor: [] as string[],
  })

  // Dog answers
  const [dogAnswers, setDogAnswers] = useState({
    energyLevel: 3,
    sociability: 3,
    training: 3,
    playStyle: [] as string[],
    favoriteActivities: [] as string[],
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth')
      return
    }

    if (user) {
      const userDogs = getDogsByUserId(user.id)
      setDogs(userDogs)

      // Проверить существующий профиль
      const existingProfile = getUserProfile(user.id)
      if (existingProfile?.completedTest) {
        router.push('/dating')
      }
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>
  }

  if (dogs.length === 0 && step === 'selectDog') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Добавьте питомца</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Для использования дейтинга сначала добавьте информацию о своей собаке
          </p>
          <Button onClick={() => router.push('/account?tab=pets')}>
            Добавить питомца
          </Button>
        </Card>
      </div>
    )
  }

  const handleUserSelect = (category: keyof typeof userAnswers, value: string) => {
    const current = userAnswers[category]
    if (current.includes(value)) {
      setUserAnswers({
        ...userAnswers,
        [category]: current.filter(v => v !== value),
      })
    } else {
      setUserAnswers({
        ...userAnswers,
        [category]: [...current, value],
      })
    }
  }

  const handleDogSelect = (category: 'playStyle' | 'favoriteActivities', value: string) => {
    const current = dogAnswers[category]
    if (current.includes(value)) {
      setDogAnswers({
        ...dogAnswers,
        [category]: current.filter(v => v !== value),
      })
    } else {
      setDogAnswers({
        ...dogAnswers,
        [category]: [...current, value],
      })
    }
  }

  const handleFinish = () => {
    if (!user || !selectedDog) return

    // Сохранить профиль пользователя
    saveUserProfile({
      userId: user.id,
      completedTest: true,
      ...userAnswers,
    })

    // Сохранить профиль собаки
    saveDogProfile({
      dogId: selectedDog.id,
      completedTest: true,
      ...dogAnswers,
    })

    router.push('/dating')
  }

  const handleNextStep = () => {
    if (step === 'user') {
      setStep('selectDog')
    } else if (step === 'selectDog' && selectedDog) {
      setStep('dog')
    }
  }

  const canProceed = () => {
    if (step === 'user') {
      return Object.values(userAnswers).some(arr => arr.length > 0)
    }
    if (step === 'selectDog') {
      return selectedDog !== null
    }
    if (step === 'dog') {
      return dogAnswers.playStyle.length > 0 || dogAnswers.favoriteActivities.length > 0
    }
    return false
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar title="Анкета для дейтинга" showBack />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {step === 'user' && 'Шаг 1 из 3: О вас'}
                {step === 'selectDog' && 'Шаг 2 из 3: Выберите собаку'}
                {step === 'dog' && 'Шаг 3 из 3: О вашей собаке'}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ 
                  width: step === 'user' ? '33%' : step === 'selectDog' ? '66%' : '100%'
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* User Questions */}
          {step === 'user' && (
            <div className="space-y-6">
              {Object.entries(userQuestions).map(([key, question]) => (
                <Card key={key} className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    {question.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={userAnswers[key as keyof typeof userAnswers].includes(option)}
                        onClick={() => handleUserSelect(key as keyof typeof userAnswers, option)}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Select Dog */}
          {step === 'selectDog' && (
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Выберите собаку</h3>
              <div className="space-y-3">
                {dogs.map((dog) => (
                  <button
                    key={dog.id}
                    onClick={() => setSelectedDog(dog)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      selectedDog?.id === dog.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl">
                        🐕
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{dog.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {dog.breed}, {dog.age} {dog.age === 1 ? 'год' : 'года'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Dog Questions */}
          {step === 'dog' && selectedDog && (
            <div className="space-y-6">
              {Object.entries(dogQuestions).map(([key, question]) => (
                <Card key={key} className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {question.title}
                  </h3>
                  {'description' in question && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {question.description}
                    </p>
                  )}

                  {'type' in question && question.type === 'scale' ? (
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        value={dogAnswers[key as keyof typeof dogAnswers] as number}
                        onChange={(e) => setDogAnswers({
                          ...dogAnswers,
                          [key]: parseInt(e.target.value),
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm">
                        {Array.from({ length: question.max }, (_, i) => i + 1).map((num) => (
                          <span key={num} className={`
                            ${dogAnswers[key as keyof typeof dogAnswers] === num 
                              ? 'text-blue-600 font-bold' 
                              : 'text-gray-400'}
                          `}>
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : 'options' in question ? (
                    <div className="flex flex-wrap gap-2">
                      {question.options.map((option) => (
                        <Chip
                          key={option}
                          label={option}
                          selected={dogAnswers[key as 'playStyle' | 'favoriteActivities'].includes(option)}
                          onClick={() => handleDogSelect(key as 'playStyle' | 'favoriteActivities', option)}
                        />
                      ))}
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            {step !== 'user' && (
              <Button
                variant="secondary"
                onClick={() => {
                  if (step === 'dog') setStep('selectDog')
                  else if (step === 'selectDog') setStep('user')
                }}
              >
                Назад
              </Button>
            )}
            {step !== 'dog' ? (
              <Button
                onClick={handleNextStep}
                disabled={!canProceed()}
                fullWidth
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!canProceed()}
                fullWidth
              >
                Завершить
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


