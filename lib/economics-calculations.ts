/**
 * Расчеты экономики проекта Dogymorbis
 * Юнит-экономика, инвестиционный план, монетизация
 */

export interface RevenueStream {
  name: string
  description: string
  percentage: number
  monthlyRevenue: number[]
  unitEconomics: {
    unit: string
    price: number
    cost: number
    margin: number
  }
}

export interface InvestmentPlan {
  round: string
  amount: number
  use: {
    category: string
    percentage: number
    amount: number
  }[]
  milestones: string[]
}

export interface UnitEconomics {
  product: string
  metrics: {
    name: string
    value: number
    unit: string
  }[]
}

// Источники дохода
export const revenueStreams: RevenueStream[] = [
  {
    name: 'Freemium подписка',
    description: 'AI-анализ здоровья и поведения, премиум-функции',
    percentage: 30,
    monthlyRevenue: [50000, 200000, 500000, 1200000, 2500000], // 5 лет
    unitEconomics: {
      unit: 'Подписка',
      price: 9.99,
      cost: 2.50,
      margin: 74.9,
    },
  },
  {
    name: 'Комиссия маркетплейс',
    description: 'С продаж товаров и услуг',
    percentage: 40,
    monthlyRevenue: [80000, 350000, 900000, 2000000, 4500000],
    unitEconomics: {
      unit: 'Транзакция',
      price: 0.12, // 12% средняя комиссия
      cost: 0.02,
      margin: 83.3,
    },
  },
  {
    name: 'Реклама и партнёрства',
    description: 'Нативная реклама, спонсорские интеграции',
    percentage: 20,
    monthlyRevenue: [30000, 150000, 400000, 900000, 2000000],
    unitEconomics: {
      unit: 'Рекламный показ',
      price: 0.05,
      cost: 0.01,
      margin: 80.0,
    },
  },
  {
    name: 'BoneCoin экосистема',
    description: 'Обмен, стейкинг, комиссии',
    percentage: 10,
    monthlyRevenue: [10000, 50000, 150000, 350000, 800000],
    unitEconomics: {
      unit: 'Транзакция',
      price: 0.02,
      cost: 0.005,
      margin: 75.0,
    },
  },
]

// Инвестиционный план
export const investmentPlan: InvestmentPlan[] = [
  {
    round: 'Seed',
    amount: 500000,
    use: [
      { category: 'Разработка', percentage: 40, amount: 200000 },
      { category: 'Маркетинг', percentage: 30, amount: 150000 },
      { category: 'Операции', percentage: 20, amount: 100000 },
      { category: 'Резерв', percentage: 10, amount: 50000 },
    ],
    milestones: [
      'Запуск MVP',
      '1,000 пользователей',
      '10 партнёров',
      'Базовая функциональность',
    ],
  },
  {
    round: 'Series A',
    amount: 2000000,
    use: [
      { category: 'Разработка', percentage: 35, amount: 700000 },
      { category: 'Маркетинг', percentage: 40, amount: 800000 },
      { category: 'Операции', percentage: 15, amount: 300000 },
      { category: 'Резерв', percentage: 10, amount: 200000 },
    ],
    milestones: [
      '10,000 пользователей',
      '100 партнёров',
      'Мобильные приложения',
      'Международная экспансия',
    ],
  },
  {
    round: 'Series B',
    amount: 5000000,
    use: [
      { category: 'Разработка', percentage: 30, amount: 1500000 },
      { category: 'Маркетинг', percentage: 45, amount: 2250000 },
      { category: 'Операции', percentage: 15, amount: 750000 },
      { category: 'Резерв', percentage: 10, amount: 500000 },
    ],
    milestones: [
      '100,000 пользователей',
      '1,000 партнёров',
      'AI-интеграция',
      'B2B платформа',
    ],
  },
]

// Юнит-экономика продуктов
export const unitEconomics: UnitEconomics[] = [
  {
    product: 'Подписка Premium',
    metrics: [
      { name: 'Цена подписки', value: 9.99, unit: '$/мес' },
      { name: 'CAC (Customer Acquisition Cost)', value: 3.50, unit: '$' },
      { name: 'LTV (Lifetime Value)', value: 89.91, unit: '$' },
      { name: 'LTV/CAC', value: 25.7, unit: 'x' },
      { name: 'Churn Rate', value: 5, unit: '%/мес' },
      { name: 'Средний срок подписки', value: 9, unit: 'мес' },
      { name: 'Маржинальность', value: 74.9, unit: '%' },
    ],
  },
  {
    product: 'Маркетплейс',
    metrics: [
      { name: 'Средняя комиссия', value: 12, unit: '%' },
      { name: 'Средний чек', value: 50, unit: '$' },
      { name: 'Комиссия с транзакции', value: 6, unit: '$' },
      { name: 'Операционные расходы', value: 1, unit: '$' },
      { name: 'Маржинальность', value: 83.3, unit: '%' },
      { name: 'Транзакций на пользователя', value: 2.5, unit: '/мес' },
    ],
  },
  {
    product: 'Реклама',
    metrics: [
      { name: 'CPM (Cost Per Mille)', value: 5, unit: '$' },
      { name: 'CTR (Click Through Rate)', value: 2.5, unit: '%' },
      { name: 'CPC (Cost Per Click)', value: 0.20, unit: '$' },
      { name: 'Конверсия', value: 3, unit: '%' },
      { name: 'CPA (Cost Per Acquisition)', value: 6.67, unit: '$' },
    ],
  },
]

// Прогноз доходов на 5 лет
export const revenueForecast = [
  {
    year: 2025,
    users: 10000,
    mrr: 160000,
    arr: 1920000,
    streams: revenueStreams.map(stream => ({
      name: stream.name,
      revenue: stream.monthlyRevenue[0] * 12,
    })),
  },
  {
    year: 2026,
    users: 100000,
    mrr: 750000,
    arr: 9000000,
    streams: revenueStreams.map(stream => ({
      name: stream.name,
      revenue: stream.monthlyRevenue[1] * 12,
    })),
  },
  {
    year: 2027,
    users: 500000,
    mrr: 1950000,
    arr: 23400000,
    streams: revenueStreams.map(stream => ({
      name: stream.name,
      revenue: stream.monthlyRevenue[2] * 12,
    })),
  },
  {
    year: 2028,
    users: 1000000,
    mrr: 4450000,
    arr: 53400000,
    streams: revenueStreams.map(stream => ({
      name: stream.name,
      revenue: stream.monthlyRevenue[3] * 12,
    })),
  },
  {
    year: 2029,
    users: 2000000,
    mrr: 9800000,
    arr: 117600000,
    streams: revenueStreams.map(stream => ({
      name: stream.name,
      revenue: stream.monthlyRevenue[4] * 12,
    })),
  },
]

// Расчет стоимости привлечения пользователя
export const cacCalculation = {
  marketing: {
    channels: [
      { name: 'Социальные сети', cost: 1.50, conversion: 2.5 },
      { name: 'Контент-маркетинг', cost: 0.80, conversion: 1.8 },
      { name: 'Партнёрская программа', cost: 0.50, conversion: 3.0 },
      { name: 'Реклама', cost: 0.70, conversion: 2.0 },
    ],
    totalCAC: 3.50,
  },
  organic: {
    sources: [
      { name: 'Поиск', percentage: 40 },
      { name: 'Рефералы', percentage: 35 },
      { name: 'Прямые заходы', percentage: 25 },
    ],
  },
}

// Прогноз расходов
export const expenseForecast = [
  {
    year: 2025,
    categories: [
      { name: 'Разработка', amount: 960000 },
      { name: 'Маркетинг', amount: 720000 },
      { name: 'Операции', amount: 480000 },
      { name: 'Административные', amount: 240000 },
    ],
    total: 2400000,
  },
  {
    year: 2026,
    categories: [
      { name: 'Разработка', amount: 3600000 },
      { name: 'Маркетинг', amount: 5400000 },
      { name: 'Операции', amount: 2700000 },
      { name: 'Административные', amount: 1800000 },
    ],
    total: 13500000,
  },
]

// Расчет точки безубыточности
export const breakEvenAnalysis = {
  fixedCosts: 200000, // в месяц
  variableCostPerUser: 0.50,
  revenuePerUser: 16.00, // средний MRR на пользователя
  breakEvenUsers: 12500, // пользователей для безубыточности
  monthsToBreakEven: 8, // месяцев при текущем росте
}
