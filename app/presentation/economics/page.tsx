'use client'

import { motion } from 'framer-motion'
import { 
  DollarSign, TrendingUp, BarChart3, Target, Users,
  PieChart, Calculator, ArrowUp, ArrowDown
} from 'lucide-react'
import { SoftCard } from '@/components/ui/SoftCard'
import { AppBar } from '@/components/navigation/AppBar'
import { 
  revenueStreams, 
  investmentPlan, 
  unitEconomics, 
  revenueForecast,
  breakEvenAnalysis 
} from '@/lib/economics-calculations'

/**
 * Детальная страница с расчетами экономики
 * Юнит-экономика, инвестиционный план, монетизация
 */
export default function EconomicsPage() {
  return (
    <div className="min-h-screen bg-plush-cream pb-20 safe-area-bottom">
      <AppBar title="Экономика проекта" />

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <Calculator size={80} className="mx-auto text-plush-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-plush-graphite">
              Экономика проекта
            </h1>
            <p className="text-xl text-plush-graphite/70">
              Детальные расчеты, юнит-экономика и инвестиционный план
            </p>
          </motion.div>

          {/* Источники дохода */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Источники дохода
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {revenueStreams.map((stream, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-plush-graphite">
                        {stream.name}
                      </h3>
                      <span className="px-3 py-1 bg-plush-primary/10 text-plush-primary rounded-full text-sm font-semibold">
                        {stream.percentage}%
                      </span>
                    </div>
                    <p className="text-plush-graphite/70 mb-4 text-sm">
                      {stream.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-plush-graphite/60">Цена единицы</span>
                        <span className="font-semibold text-plush-graphite">${stream.unitEconomics.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-plush-graphite/60">Себестоимость</span>
                        <span className="font-semibold text-plush-graphite">${stream.unitEconomics.cost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-plush-graphite/60">Маржинальность</span>
                        <span className="font-semibold text-plush-primary">{stream.unitEconomics.margin}%</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-plush-graphite/10">
                      <p className="text-xs text-plush-graphite/60 mb-2">Прогноз дохода (5 лет)</p>
                      <div className="flex gap-2">
                        {stream.monthlyRevenue.map((revenue, j) => (
                          <div key={j} className="flex-1 text-center">
                            <p className="text-xs text-plush-graphite/60">Y{j + 1}</p>
                            <p className="text-sm font-semibold text-plush-primary">
                              ${(revenue / 1000).toFixed(0)}K
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Юнит-экономика */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Юнит-экономика
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {unitEconomics.map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6">
                    <h3 className="text-lg font-semibold text-plush-graphite mb-4">
                      {product.product}
                    </h3>
                    <div className="space-y-3">
                      {product.metrics.map((metric, j) => (
                        <div key={j} className="flex justify-between items-center p-2 bg-plush-cream-pressed rounded-plush-card">
                          <span className="text-sm text-plush-graphite/70">{metric.name}</span>
                          <div className="text-right">
                            <span className="font-semibold text-plush-graphite">{metric.value}</span>
                            <span className="text-xs text-plush-graphite/60 ml-1">{metric.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Инвестиционный план */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Инвестиционный план
            </h2>
            <div className="space-y-6">
              {investmentPlan.map((round, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-plush-graphite">
                        {round.round} раунд
                      </h3>
                      <span className="text-2xl font-bold text-plush-primary">
                        ${(round.amount / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      {round.use.map((item, j) => (
                        <div key={j} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-plush-graphite/70">{item.category}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-plush-graphite/60">{item.percentage}%</span>
                              <span className="font-semibold text-plush-graphite">
                                ${(item.amount / 1000).toFixed(0)}K
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-plush-cream-pressed rounded-full h-2">
                            <div
                              className="bg-plush-primary h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-plush-graphite/10">
                      <p className="text-sm font-semibold text-plush-graphite mb-2">Ключевые вехи</p>
                      <ul className="space-y-1">
                        {round.milestones.map((milestone, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-plush-graphite/70">
                            <Target size={16} className="text-plush-primary mt-0.5 flex-shrink-0" />
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Прогноз доходов */}
          <div>
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Прогноз доходов на 5 лет
            </h2>
            <div className="space-y-4">
              {revenueForecast.map((year, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SoftCard depth={1} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-plush-graphite">
                        {year.year}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm text-plush-graphite/60">ARR</p>
                        <p className="text-2xl font-bold text-plush-primary">
                          ${(year.arr / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-plush-cream-pressed rounded-plush-card">
                        <p className="text-xs text-plush-graphite/60 mb-1">Пользователей</p>
                        <p className="text-lg font-semibold text-plush-graphite">
                          {year.users.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-plush-cream-pressed rounded-plush-card">
                        <p className="text-xs text-plush-graphite/60 mb-1">MRR</p>
                        <p className="text-lg font-semibold text-plush-primary">
                          ${(year.mrr / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-plush-graphite/10">
                      <p className="text-sm font-semibold text-plush-graphite mb-2">По источникам</p>
                      <div className="space-y-2">
                        {year.streams.map((stream, j) => (
                          <div key={j} className="flex justify-between text-sm">
                            <span className="text-plush-graphite/70">{stream.name}</span>
                            <span className="font-semibold text-plush-graphite">
                              ${(stream.revenue / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SoftCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Точка безубыточности */}
          <SoftCard depth={2} className="p-6 md:p-8 bg-gradient-to-br from-plush-primary/10 to-plush-sky/10">
            <h2 className="text-2xl font-semibold text-plush-graphite mb-6">
              Точка безубыточности
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-plush-card">
                <p className="text-xs text-plush-graphite/60 mb-1">Постоянные расходы</p>
                <p className="text-xl font-bold text-plush-graphite">
                  ${(breakEvenAnalysis.fixedCosts / 1000).toFixed(0)}K/мес
                </p>
              </div>
              <div className="p-4 bg-white rounded-plush-card">
                <p className="text-xs text-plush-graphite/60 mb-1">Пользователей для безубыточности</p>
                <p className="text-xl font-bold text-plush-primary">
                  {breakEvenAnalysis.breakEvenUsers.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white rounded-plush-card">
                <p className="text-xs text-plush-graphite/60 mb-1">Месяцев до безубыточности</p>
                <p className="text-xl font-bold text-plush-sky">
                  {breakEvenAnalysis.monthsToBreakEven}
                </p>
              </div>
              <div className="p-4 bg-white rounded-plush-card">
                <p className="text-xs text-plush-graphite/60 mb-1">Доход на пользователя</p>
                <p className="text-xl font-bold text-plush-yellow">
                  ${breakEvenAnalysis.revenuePerUser}/мес
                </p>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}
