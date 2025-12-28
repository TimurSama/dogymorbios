'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PersonalityType } from '@/lib/matchmaking'

interface Question {
  id: number
  text: string
  options: {
    text: string
    value: 'EXTROVERT' | 'INTROVERT' | 'AMBIVERT'
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Как вы предпочитаете проводить время с собакой?',
    options: [
      { text: 'В больших компаниях, на мероприятиях', value: 'EXTROVERT' },
      { text: 'В одиночестве или с близкими друзьями', value: 'INTROVERT' },
      { text: 'Зависит от настроения', value: 'AMBIVERT' },
    ],
  },
  {
    id: 2,
    text: 'Что вас больше привлекает в прогулках?',
    options: [
      { text: 'Активные игры и общение', value: 'EXTROVERT' },
      { text: 'Спокойные прогулки в тишине', value: 'INTROVERT' },
      { text: 'Разнообразие активностей', value: 'AMBIVERT' },
    ],
  },
  {
    id: 3,
    text: 'Как вы реагируете на новых людей?',
    options: [
      { text: 'Легко знакомлюсь и общаюсь', value: 'EXTROVERT' },
      { text: 'Предпочитаю наблюдать со стороны', value: 'INTROVERT' },
      { text: 'Зависит от ситуации', value: 'AMBIVERT' },
    ],
  },
  {
    id: 4,
    text: 'Ваша собака любит знакомиться с другими собаками?',
    options: [
      { text: 'Да, очень общительная', value: 'EXTROVERT' },
      { text: 'Нет, предпочитает одиночество', value: 'INTROVERT' },
      { text: 'Иногда, зависит от настроения', value: 'AMBIVERT' },
    ],
  },
  // Добавить еще 12 вопросов для полноты теста
]

interface PersonalityTestProps {
  onComplete: (result: PersonalityType) => void
  onCancel: () => void
}

export function PersonalityTest({ onComplete, onCancel }: PersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({})

  const handleAnswer = (value: PersonalityType) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300)
    } else {
      // Вычисляем результат
      const counts = { EXTROVERT: 0, INTROVERT: 0, AMBIVERT: 0 }
      Object.values(answers).forEach(answer => {
        counts[answer]++
      })
      counts[questions[currentQuestion].options.find(o => o.value === value)?.value || 'AMBIVERT']++
      
      const result = Object.entries(counts).reduce((a, b) => 
        counts[a[0] as PersonalityType] > counts[b[0] as PersonalityType] ? a : b
      )[0] as PersonalityType
      
      setTimeout(() => onComplete(result), 500)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] safe-area-top safe-area-bottom">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[var(--outline)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-title font-bold text-[var(--text-primary)]">
              Тест психотипа
            </h2>
            <Button variant="ghost" onClick={onCancel} className="touch-target">
              Отмена
            </Button>
          </div>
          <div className="w-full h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--sky)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-caption text-[var(--text-secondary)] mt-2">
            Вопрос {currentQuestion + 1} из {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl"
            >
              <Card className="p-6" elevation={2}>
                <h3 className="text-label font-semibold text-[var(--text-primary)] mb-6">
                  {questions[currentQuestion].text}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all touch-target
                        ${answers[currentQuestion] === option.value
                          ? 'border-[var(--sky)] bg-[var(--sky)]/10'
                          : 'border-[var(--outline)] hover:border-[var(--sky)]/50'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-body text-[var(--text-primary)]">
                          {option.text}
                        </span>
                        {answers[currentQuestion] === option.value && (
                          <Check size={20} className="text-[var(--sky)]" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-[var(--outline)] flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="touch-target"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад
          </Button>
          <span className="text-caption text-[var(--text-secondary)]">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
      </div>
    </div>
  )
}

