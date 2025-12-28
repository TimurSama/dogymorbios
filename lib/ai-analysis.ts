// AI-анализ данных журнала
// В продакшене будет интеграция с OpenAI API

export interface JournalEntry {
  id: string
  type: string
  date: Date
  data: Record<string, any>
}

export interface AIRecommendation {
  type: 'health' | 'training' | 'nutrition' | 'behavior' | 'general'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  actionItems?: string[]
}

// Анализ паттернов в данных
export function analyzePatterns(entries: JournalEntry[]): {
  patterns: string[]
  insights: string[]
} {
  const patterns: string[] = []
  const insights: string[] = []

  // Анализ прогулок
  const walks = entries.filter(e => e.type === 'walk')
  if (walks.length > 0) {
    const avgDistance = walks.reduce((sum, e) => sum + (e.data.distance || 0), 0) / walks.length
    const avgDuration = walks.reduce((sum, e) => sum + (e.data.duration || 0), 0) / walks.length

    if (avgDistance < 1) {
      patterns.push('Короткие прогулки')
      insights.push('Средняя длина прогулок меньше 1 км. Рекомендуется увеличить активность.')
    } else if (avgDistance > 3) {
      patterns.push('Активные прогулки')
      insights.push('Отличная активность! Собака получает достаточно физических нагрузок.')
    }

    if (avgDuration < 20) {
      insights.push('Прогулки довольно короткие. Для большинства собак рекомендуется минимум 30-45 минут.')
    }
  }

  // Анализ настроения
  const moods = entries.filter(e => e.type === 'mood')
  if (moods.length > 0) {
    const avgMood = moods.reduce((sum, e) => sum + (e.data.mood || 5), 0) / moods.length
    if (avgMood < 5) {
      patterns.push('Низкое настроение')
      insights.push('Наблюдается снижение настроения. Возможно, стоит увеличить активность или проверить здоровье.')
    } else if (avgMood > 7) {
      patterns.push('Отличное настроение')
      insights.push('Собака в отличном настроении! Продолжайте в том же духе.')
    }
  }

  // Анализ питания
  const feedings = entries.filter(e => e.type === 'feeding')
  if (feedings.length > 0) {
    const poorAppetite = feedings.filter(e => e.data.appetite === 'poor' || e.data.appetite === 'none').length
    if (poorAppetite > feedings.length * 0.3) {
      patterns.push('Проблемы с аппетитом')
      insights.push('Частые отказы от еды могут указывать на проблемы со здоровьем. Рекомендуется консультация ветеринара.')
    }
  }

  // Анализ поведения
  const behaviors = entries.filter(e => e.type === 'behavior')
  if (behaviors.length > 0) {
    const avgAggression = behaviors.reduce((sum, e) => sum + (e.data.behavior?.aggression || 3), 0) / behaviors.length
    if (avgAggression > 4) {
      patterns.push('Повышенная агрессивность')
      insights.push('Наблюдается повышенная агрессивность. Рекомендуется консультация кинолога или ветеринара.')
    }
  }

  return { patterns, insights }
}

// Генерация рекомендаций
export function generateRecommendations(
  entries: JournalEntry[],
  patterns: string[],
  insights: string[]
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = []

  // Рекомендации по здоровью
  const healthEntries = entries.filter(e => ['vet', 'health', 'feeding'].includes(e.type))
  if (healthEntries.length > 0) {
    const lastVet = entries.filter(e => e.type === 'vet').sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0]
    
    if (!lastVet || (Date.now() - new Date(lastVet.date).getTime()) > 6 * 30 * 24 * 60 * 60 * 1000) {
      recommendations.push({
        type: 'health',
        title: 'Плановый осмотр у ветеринара',
        description: 'Рекомендуется посетить ветеринара для планового осмотра.',
        priority: 'medium',
        actionItems: ['Записаться на приём', 'Подготовить вопросы для ветеринара'],
      })
    }
  }

  // Рекомендации по тренировкам
  const trainings = entries.filter(e => e.type === 'training')
  if (trainings.length < 3) {
    recommendations.push({
      type: 'training',
      title: 'Увеличить частоту тренировок',
      description: 'Тренировки проводятся редко. Рекомендуется минимум 2-3 тренировки в неделю.',
      priority: 'medium',
      actionItems: ['Посмотреть упражнения в разделе "Тренировки"', 'Составить план тренировок'],
    })
  }

  // Рекомендации по питанию
  if (patterns.includes('Проблемы с аппетитом')) {
    recommendations.push({
      type: 'nutrition',
      title: 'Проверить рацион питания',
      description: 'Частые отказы от еды могут быть связаны с неподходящим кормом или проблемами со здоровьем.',
      priority: 'high',
      actionItems: ['Проконсультироваться с ветеринаром', 'Попробовать другой корм', 'Проверить здоровье'],
    })
  }

  // Рекомендации по поведению
  if (patterns.includes('Повышенная агрессивность')) {
    recommendations.push({
      type: 'behavior',
      title: 'Работа над поведением',
      description: 'Повышенная агрессивность требует внимания. Рекомендуется работа с кинологом.',
      priority: 'high',
      actionItems: ['Найти кинолога', 'Изучить методы коррекции поведения', 'Увеличить социализацию'],
    })
  }

  // Общие рекомендации на основе инсайтов
  if (insights.length > 0) {
    recommendations.push({
      type: 'general',
      title: 'Персональные рекомендации',
      description: insights.join(' '),
      priority: 'medium',
    })
  }

  return recommendations
}

// Полный AI-анализ
export function performAIAnalysis(entries: JournalEntry[]): {
  patterns: string[]
  insights: string[]
  recommendations: AIRecommendation[]
  summary: string
} {
  const { patterns, insights } = analyzePatterns(entries)
  const recommendations = generateRecommendations(entries, patterns, insights)

  const summary = `
    На основе анализа ${entries.length} записей в журнале:
    ${patterns.length > 0 ? `Выявлены паттерны: ${patterns.join(', ')}.` : ''}
    ${insights.length > 0 ? `Инсайты: ${insights.join(' ')}` : ''}
    ${recommendations.length > 0 ? `Сгенерировано ${recommendations.length} рекомендаций.` : ''}
  `.trim()

  return {
    patterns,
    insights,
    recommendations,
    summary,
  }
}

