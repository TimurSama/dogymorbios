'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Heart, GraduationCap, Utensils, Shield, Book, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Chip } from '@/components/ui/Chip'

interface Article {
  id: string
  title: string
  category: 'care' | 'training' | 'health' | 'nutrition' | 'breeds' | 'behavior' | 'first-aid' | 'travel'
  excerpt: string
  content: string
  author: string
  date: string
  views: number
  rating: number
  tags: string[]
  image?: string
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Как правильно кормить щенка',
    category: 'nutrition',
    excerpt: 'Правильное питание - основа здоровья вашего питомца. Узнайте, как составить рацион для щенка.',
    content: 'Полное содержание статьи...',
    author: 'Доктор Вет',
    date: '2025-01-15',
    views: 1250,
    rating: 4.8,
    tags: ['питание', 'щенки', 'здоровье'],
  },
  {
    id: '2',
    title: 'Базовые команды для собак',
    category: 'training',
    excerpt: 'Обучение базовым командам - первый шаг к послушной собаке. Пошаговое руководство.',
    content: 'Полное содержание статьи...',
    author: 'Кинолог Иван',
    date: '2025-01-14',
    views: 980,
    rating: 4.9,
    tags: ['дрессировка', 'команды', 'обучение'],
  },
  {
    id: '3',
    title: 'Первая помощь собаке',
    category: 'first-aid',
    excerpt: 'Что делать в экстренной ситуации? Основы первой помощи для собак.',
    content: 'Полное содержание статьи...',
    author: 'Ветеринар Мария',
    date: '2025-01-13',
    views: 2100,
    rating: 5.0,
    tags: ['первая помощь', 'здоровье', 'экстренная помощь'],
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <BookOpen size={14} /> },
  { id: 'care', label: 'Уход', icon: <Heart size={14} /> },
  { id: 'training', label: 'Дрессировка', icon: <GraduationCap size={14} /> },
  { id: 'health', label: 'Здоровье', icon: <Shield size={14} /> },
  { id: 'nutrition', label: 'Питание', icon: <Utensils size={14} /> },
  { id: 'breeds', label: 'Породы', icon: <Book size={14} /> },
  { id: 'first-aid', label: 'Первая помощь', icon: <Heart size={14} /> },
]

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] safe-area-top">
      <AppBar title="База знаний" />

      {/* Поиск */}
      <div className="px-4 pt-4 pb-2">
        <Input
          placeholder="Поиск статей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      {/* Категории */}
      <div className="px-4 pt-2 pb-4 border-b border-[var(--outline)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Список статей */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto mb-4 text-[var(--text-secondary)]" />
            <p className="text-body text-[var(--text-secondary)]">
              Статьи не найдены
            </p>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-4"
                elevation={1}
                interactive
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-label font-semibold text-[var(--text-primary)] mb-2">
                      {article.title}
                    </h3>
                    <p className="text-body text-[var(--text-secondary)] mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-caption text-[var(--text-secondary)]">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.views} просмотров</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{article.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-[var(--surface-2)] text-caption text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Модальное окно с статьёй */}
      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4 safe-area-top safe-area-bottom"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg)] rounded-t-3xl md:rounded-3xl"
          >
            <div className="sticky top-0 bg-[var(--bg)] border-b border-[var(--outline)] p-4 flex items-center justify-between">
              <h2 className="text-title font-bold text-[var(--text-primary)] flex-1">
                {selectedArticle.title}
              </h2>
              <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-caption text-[var(--text-secondary)]">
                <span>{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.views} просмотров</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{selectedArticle.rating}</span>
                </span>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-body text-[var(--text-primary)] leading-relaxed">
                  {selectedArticle.content || selectedArticle.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--outline)]">
                {selectedArticle.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

