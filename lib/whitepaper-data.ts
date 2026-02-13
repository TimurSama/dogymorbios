/**
 * Данные для попапов вайтпэпера
 * Структурированная информация по всем модулям
 */

import { ReactNode } from 'react'
import { 
  Map, Users, Heart, BookOpen, ShoppingBag, Building2,
  DollarSign, TrendingUp, Award, Zap, Globe, Rocket,
  Coins, BarChart3, Target, Calendar
} from 'lucide-react'
import { BoneIcon } from '@/components/icons/DogymorbisIcons'

export interface WhitepaperSection {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
  related?: string[]
}

export const whitepaperSections: Record<string, WhitepaperSection> = {
  // ЭКОСИСТЕМА
  ecosystem: {
    id: 'ecosystem',
    title: 'Экосистема Dogymorbis',
    icon: <Building2 size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-4">
        <p className="text-plush-graphite/70">
          Dogymorbis — это комплексная платформа, объединяющая все аспекты жизни с собакой в единой экосистеме.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            { title: 'Карта прогулок', desc: 'GPS-трекинг, сбор призов, совместные прогулки' },
            { title: 'Социальная сеть', desc: 'Лента, посты, друзья, сообщества' },
            { title: 'Умный дейтинг', desc: 'Combo-Match для владельцев и собак' },
            { title: 'Умный журнал', desc: 'AI-анализ здоровья и поведения' },
            { title: 'Тренировки', desc: 'База упражнений и персональные программы' },
            { title: 'База знаний', desc: 'Энциклопедия статей о собаках' },
            { title: 'Маркетплейс', desc: 'Товары и услуги для питомцев' },
            { title: 'DAO управление', desc: 'Децентрализованное управление экосистемой' },
          ].map((item, i) => (
            <SoftCard key={i} depth={1} className="p-4">
              <h4 className="font-semibold text-plush-graphite mb-1">{item.title}</h4>
              <p className="text-sm text-plush-graphite/60">{item.desc}</p>
            </SoftCard>
          ))}
        </div>
      </div>
    ),
    related: ['tokenomics', 'business-model'],
  },

  // ТОКЕНОМИКА
  tokenomics: {
    id: 'tokenomics',
    title: 'Косточкономика (BoneCoin)',
    icon: <BoneIcon size={48} className="text-plush-yellow" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-3">
            Общая информация
          </h3>
          <p className="text-plush-graphite/70 mb-4">
            BoneCoin — внутренняя валюта платформы, начисляемая за активность и используемая для покупок и услуг.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-3">
            Способы заработка
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Прогулки', amount: '1 BoneCoin за 100м', desc: 'За каждый пройденный метр' },
              { action: 'Посты', amount: '5-20 BoneCoin', desc: 'В зависимости от популярности' },
              { action: 'Лайки', amount: '1 BoneCoin', desc: 'За каждый лайк' },
              { action: 'Комментарии', amount: '2 BoneCoin', desc: 'За каждый комментарий' },
              { action: 'Сбор призов', amount: '10-100 BoneCoin', desc: 'В зависимости от редкости' },
              { action: 'Задания', amount: '50-500 BoneCoin', desc: 'Ежедневные и недельные задания' },
              { action: 'Приглашение друзей', amount: '100 BoneCoin', desc: 'За каждого приглашённого' },
              { action: 'События', amount: '25-200 BoneCoin', desc: 'За участие в мероприятиях' },
              { action: 'Кэшбек', amount: '5-10%', desc: 'С покупок в маркетплейсе' },
            ].map((item, i) => (
              <SoftCard key={i} depth={1} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-plush-graphite">{item.action}</p>
                    <p className="text-sm text-plush-graphite/60">{item.desc}</p>
                  </div>
                  <span className="text-plush-yellow font-bold">{item.amount}</span>
                </div>
              </SoftCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-3">
            Использование косточек
          </h3>
          <ul className="space-y-2 text-plush-graphite/70">
            <li>• Скидки в маркетплейсе (до 50%)</li>
            <li>• Оплата части консультаций</li>
            <li>• Доступ к премиальным тренировкам</li>
            <li>• Продвижение постов в ленте</li>
            <li>• Кастомизация профиля</li>
            <li>• Обмен на фиат (в разработке)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-3">
            График эмиссии
          </h3>
          <SoftCard depth={1} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-plush-graphite/70">Максимальная эмиссия:</span>
                <span className="font-semibold text-plush-graphite">1,000,000,000 BoneCoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-plush-graphite/70">Ежедневная эмиссия:</span>
                <span className="font-semibold text-plush-graphite">~500,000 BoneCoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-plush-graphite/70">Механизм сжигания:</span>
                <span className="font-semibold text-plush-graphite">5% от транзакций</span>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    ),
    related: ['staking', 'business-model'],
  },

  // СТЕЙКИНГ
  staking: {
    id: 'staking',
    title: 'Стейкинг BoneCoin',
    icon: <Coins size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-4">
        <p className="text-plush-graphite/70">
          Стейкинг BoneCoin позволяет получать пассивный доход и участвовать в управлении DAO.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <SoftCard depth={1} className="p-4">
            <h4 className="font-semibold text-plush-graphite mb-2">Гибкие ставки</h4>
            <p className="text-sm text-plush-graphite/60">
              От 1 до 365 дней. Чем дольше срок, тем выше процент.
            </p>
          </SoftCard>
          <SoftCard depth={1} className="p-4">
            <h4 className="font-semibold text-plush-graphite mb-2">Процентная ставка (APY)</h4>
            <p className="text-sm text-plush-graphite/60">
              5-15% годовых в зависимости от срока стейкинга.
            </p>
          </SoftCard>
          <SoftCard depth={1} className="p-4">
            <h4 className="font-semibold text-plush-graphite mb-2">Компаундирование</h4>
            <p className="text-sm text-plush-graphite/60">
              Проценты начисляются ежедневно и автоматически реинвестируются.
            </p>
          </SoftCard>
          <SoftCard depth={1} className="p-4">
            <h4 className="font-semibold text-plush-graphite mb-2">Досрочное снятие</h4>
            <p className="text-sm text-plush-graphite/60">
              Возможно с штрафом 2% от суммы стейкинга.
            </p>
          </SoftCard>
        </div>
      </div>
    ),
    related: ['tokenomics', 'dao'],
  },

  // БИЗНЕС-МОДЕЛЬ
  'business-model': {
    id: 'business-model',
    title: 'Бизнес-модель',
    icon: <BarChart3 size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Источники дохода
          </h3>
          <div className="space-y-4">
            {[
              {
                title: 'Freemium подписка',
                desc: 'AI-анализ здоровья и поведения, премиум-функции',
                revenue: '30%',
                details: 'Базовые функции бесплатны. Премиум подписка ($9.99/мес) включает расширенную аналитику, приоритетные консультации, безлимитные тренировки.',
              },
              {
                title: 'Комиссия маркетплейс',
                desc: 'С продаж товаров и услуг',
                revenue: '40%',
                details: 'Комиссия 5-15% в зависимости от тарифа партнёра. Основной источник дохода.',
              },
              {
                title: 'Реклама и партнёрства',
                desc: 'Нативная реклама, спонсорские интеграции',
                revenue: '20%',
                details: 'Нативная реклама в ленте, спонсорские публикации, баннеры в приложении.',
              },
              {
                title: 'BoneCoin экосистема',
                desc: 'Обмен, стейкинг, комиссии',
                revenue: '10%',
                details: 'Комиссии за обмен BoneCoin на фиат, стейкинг доходы, транзакционные сборы.',
              },
            ].map((stream, i) => (
              <SoftCard key={i} depth={1} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-plush-graphite">{stream.title}</h4>
                      <span className="px-3 py-1 bg-plush-primary/10 text-plush-primary rounded-full text-sm font-semibold">
                        {stream.revenue}
                      </span>
                    </div>
                    <p className="text-plush-graphite/70 mb-2">{stream.desc}</p>
                    <p className="text-sm text-plush-graphite/60">{stream.details}</p>
                  </div>
                </div>
              </SoftCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Прогноз доходов
          </h3>
          <SoftCard depth={1} className="p-6">
            <div className="space-y-3">
              {[
                { year: '2025', revenue: '$500K', users: '10K' },
                { year: '2026', revenue: '$5M', users: '100K' },
                { year: '2027', revenue: '$25M', users: '500K' },
              ].map((forecast, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-plush-cream-pressed rounded-plush-card">
                  <div>
                    <p className="font-semibold text-plush-graphite">{forecast.year}</p>
                    <p className="text-sm text-plush-graphite/60">{forecast.users} пользователей</p>
                  </div>
                  <p className="text-xl font-bold text-plush-primary">{forecast.revenue}</p>
                </div>
              ))}
            </div>
          </SoftCard>
        </div>
      </div>
    ),
    related: ['tokenomics', 'market'],
  },

  // РЫНОК
  market: {
    id: 'market',
    title: 'Рынок и потенциал',
    icon: <TrendingUp size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Размер рынка
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <SoftCard depth={1} className="p-6">
              <h4 className="font-semibold text-plush-graphite mb-2">TAM</h4>
              <p className="text-3xl font-bold text-plush-primary mb-2">$152B</p>
              <p className="text-sm text-plush-graphite/60">Total Addressable Market (2024)</p>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h4 className="font-semibold text-plush-graphite mb-2">SAM</h4>
              <p className="text-3xl font-bold text-plush-primary mb-2">$15B</p>
              <p className="text-sm text-plush-graphite/60">Serviceable Addressable Market</p>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h4 className="font-semibold text-plush-graphite mb-2">SOM</h4>
              <p className="text-3xl font-bold text-plush-primary mb-2">$500M</p>
              <p className="text-sm text-plush-graphite/60">Serviceable Obtainable Market (5 лет)</p>
            </SoftCard>
            <SoftCard depth={1} className="p-6">
              <h4 className="font-semibold text-plush-graphite mb-2">Прогноз 2025</h4>
              <p className="text-3xl font-bold text-plush-primary mb-2">$157B</p>
              <p className="text-sm text-plush-graphite/60">Рост на 3.3%</p>
            </SoftCard>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Целевая аудитория
          </h3>
          <div className="space-y-3">
            {[
              { segment: 'Владельцы собак (основная)', size: '68M+', desc: 'Домохозяйств с собаками в США' },
              { segment: 'Профессионалы', size: '500K+', desc: 'Ветеринары, кинологи, грумеры' },
              { segment: 'Бизнес', size: '50K+', desc: 'Зоомагазины, клиники, салоны' },
            ].map((item, i) => (
              <SoftCard key={i} depth={1} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-plush-graphite">{item.segment}</p>
                    <p className="text-sm text-plush-graphite/60">{item.desc}</p>
                  </div>
                  <span className="text-xl font-bold text-plush-primary">{item.size}</span>
                </div>
              </SoftCard>
            ))}
          </div>
        </div>
      </div>
    ),
    related: ['business-model', 'investment'],
  },

  // ИНВЕСТИЦИОННЫЙ ПЛАН
  investment: {
    id: 'investment',
    title: 'Инвестиционный план',
    icon: <Target size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Требуемые инвестиции
          </h3>
          <SoftCard depth={1} className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-plush-graphite/70">Seed раунд:</span>
                <span className="text-2xl font-bold text-plush-primary">$500K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-plush-graphite/70">Series A:</span>
                <span className="text-2xl font-bold text-plush-primary">$2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-plush-graphite/70">Series B:</span>
                <span className="text-2xl font-bold text-plush-primary">$5M</span>
              </div>
            </div>
          </SoftCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Распределение средств (Seed раунд)
          </h3>
          <div className="space-y-3">
            {[
              { category: 'Разработка', percent: 40, amount: '$200K' },
              { category: 'Маркетинг', percent: 30, amount: '$150K' },
              { category: 'Операции', percent: 20, amount: '$100K' },
              { category: 'Резерв', percent: 10, amount: '$50K' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-plush-graphite">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-plush-graphite/60">{item.amount}</span>
                    <span className="text-sm font-semibold text-plush-primary">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-plush-cream-pressed rounded-full h-2">
              <div
                className="bg-plush-primary h-2 rounded-full"
                style={{ width: `${item.percent}%` }}
              />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-plush-graphite mb-4">
            Ожидаемые результаты
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <SoftCard depth={1} className="p-4">
              <h4 className="font-semibold text-plush-graphite mb-2">Через 6 месяцев</h4>
              <ul className="space-y-1 text-sm text-plush-graphite/70">
                <li>• 10K активных пользователей</li>
                <li>• $50K MRR</li>
                <li>• 100 партнёров</li>
              </ul>
            </SoftCard>
            <SoftCard depth={1} className="p-4">
              <h4 className="font-semibold text-plush-graphite mb-2">Через 12 месяцев</h4>
              <ul className="space-y-1 text-sm text-plush-graphite/70">
                <li>• 100K активных пользователей</li>
                <li>• $500K MRR</li>
                <li>• 1,000 партнёров</li>
              </ul>
            </SoftCard>
          </div>
        </div>
      </div>
    ),
    related: ['business-model', 'roadmap'],
  },

  // ДОРОЖНАЯ КАРТА
  roadmap: {
    id: 'roadmap',
    title: 'Дорожная карта',
    icon: <Calendar size={48} className="text-plush-primary" />,
    content: (
      <div className="space-y-6">
        {[
          {
            quarter: 'Q1 2025',
            goals: [
              'Запуск MVP',
              'Карта и Лента',
              'BoneCoin запуск',
              '1K пользователей',
            ],
            metrics: 'DAU: 500, Retention: 40%',
          },
          {
            quarter: 'Q2 2025',
            goals: [
              'Маркетплейс запуск',
              'DAO запуск',
              'Партнёрская программа',
              '10K пользователей',
            ],
            metrics: 'DAU: 3K, Retention: 50%, MRR: $10K',
          },
          {
            quarter: 'Q3 2025',
            goals: [
              'AI-анализ журнала',
              'NFT достижения',
              'Международная экспансия',
              '50K пользователей',
            ],
            metrics: 'DAU: 15K, Retention: 55%, MRR: $50K',
          },
          {
            quarter: 'Q4 2025',
            goals: [
              'Мобильные приложения',
              'GPS-трекеры интеграция',
              'B2B платформа',
              '100K пользователей',
            ],
            metrics: 'DAU: 30K, Retention: 60%, MRR: $200K',
          },
        ].map((quarter, i) => (
          <SoftCard key={i} depth={1} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-xl font-semibold text-plush-primary">{quarter.quarter}</h4>
              <span className="text-sm text-plush-graphite/60">{quarter.metrics}</span>
            </div>
            <ul className="space-y-2">
              {quarter.goals.map((goal, j) => (
                <li key={j} className="flex items-start gap-2 text-plush-graphite/70">
                  <span className="text-plush-primary mt-1">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </SoftCard>
        ))}
      </div>
    ),
    related: ['investment', 'ecosystem'],
  },
}

export function getWhitepaperSection(id: string): WhitepaperSection | undefined {
  return whitepaperSections[id]
}

export function getRelatedSections(id: string): WhitepaperSection[] {
  const section = whitepaperSections[id]
  if (!section?.related) return []
  return section.related
    .map(relatedId => whitepaperSections[relatedId])
    .filter(Boolean) as WhitepaperSection[]
}
