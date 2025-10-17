'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Search, Filter, Star, Heart, Plus, Minus } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip } from '@/components/ui/Chip'
import { formatCurrency } from '@/lib/utils'
import { BowlIcon, BoneIcon } from '@/components/icons/DogymorbisIcons'

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: 'BoneCoin' | 'RUB'
  rating: number
  reviews: number
  category: 'food' | 'toys' | 'accessories' | 'health' | 'training' | 'services'
  image: string
  inStock: boolean
  discount?: number
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Премиум корм для собак',
    description: 'Натуральный корм с говядиной и овощами, 3 кг',
    price: 150,
    currency: 'BoneCoin',
    rating: 4.8,
    reviews: 124,
    category: 'food',
    image: '🍖',
    inStock: true,
  },
  {
    id: '2',
    name: 'Интерактивная игрушка',
    description: 'Мяч-головоломка для лакомств',
    price: 50,
    currency: 'BoneCoin',
    rating: 4.6,
    reviews: 89,
    category: 'toys',
    image: '🎾',
    inStock: true,
    discount: 20,
  },
  {
    id: '3',
    name: 'Поводок-рулетка',
    description: 'Автоматический поводок 5 метров',
    price: 1200,
    currency: 'RUB',
    rating: 4.9,
    reviews: 256,
    category: 'accessories',
    image: '🦴',
    inStock: true,
  },
  {
    id: '4',
    name: 'Витамины для собак',
    description: 'Комплекс витаминов для здоровья суставов',
    price: 80,
    currency: 'BoneCoin',
    rating: 4.7,
    reviews: 67,
    category: 'health',
    image: '💊',
    inStock: true,
  },
  {
    id: '5',
    name: 'Кликер для дрессировки',
    description: 'Профессиональный кликер с ремешком',
    price: 25,
    currency: 'BoneCoin',
    rating: 4.5,
    reviews: 143,
    category: 'training',
    image: '🎯',
    inStock: true,
  },
  {
    id: '6',
    name: 'Груминг-услуга',
    description: 'Полный комплекс: стрижка, мытье, укладка',
    price: 2500,
    currency: 'RUB',
    rating: 5.0,
    reviews: 198,
    category: 'services',
    image: '✂️',
    inStock: true,
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <BowlIcon size={14} /> },
  { id: 'food', label: 'Корм', icon: '🍖' },
  { id: 'toys', label: 'Игрушки', icon: '🎾' },
  { id: 'accessories', label: 'Аксессуары', icon: '🦴' },
  { id: 'health', label: 'Здоровье', icon: '💊' },
  { id: 'training', label: 'Дрессировка', icon: '🎯' },
  { id: 'services', label: 'Услуги', icon: '✂️' },
]

const tabs = ['Товары', 'Услуги', 'Корзина']

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('Товары')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{[key: string]: number}>({})

  const filteredProducts = mockProducts.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchTab = activeTab === 'Товары' ? product.category !== 'services' : product.category === 'services'
    return matchCategory && matchSearch && (activeTab === 'Корзина' || matchTab)
  })

  const cartItems = Object.keys(cart).map(id => ({
    product: mockProducts.find(p => p.id === id)!,
    quantity: cart[id]
  })).filter(item => item.product && item.quantity > 0)

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const addToCart = (productId: string) => {
    setCart({ ...cart, [productId]: (cart[productId] || 0) + 1 })
  }

  const removeFromCart = (productId: string) => {
    const newQuantity = (cart[productId] || 0) - 1
    if (newQuantity <= 0) {
      const newCart = { ...cart }
      delete newCart[productId]
      setCart(newCart)
    } else {
      setCart({ ...cart, [productId]: newQuantity })
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Магазин" 
        actions={
          <button className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
            <ShoppingCart size={20} />
            {Object.keys(cart).length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">
                  {Object.values(cart).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
            )}
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-body font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-sky'
                : 'text-text-secondary-light dark:text-text-secondary-dark'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabStore"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-6xl mx-auto p-4 space-y-4">
          {activeTab !== 'Корзина' && (
            <>
              {/* Search */}
              <Input
                placeholder="Поиск товаров и услуг..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
              />

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map((cat) => (
                  <Chip
                    key={cat.id}
                    label={cat.label}
                    icon={typeof cat.icon === 'string' ? cat.icon : cat.icon}
                    selected={selectedCategory === cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                  />
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col" elevation={2} interactive>
                      {/* Image */}
                      <div className="relative aspect-square bg-gradient-to-br from-honey/20 to-sky/20 flex items-center justify-center rounded-t-lg">
                        <div className="text-6xl">{product.image}</div>
                        {product.discount && (
                          <div className="absolute top-2 right-2 bg-danger text-white px-2 py-1 rounded-full text-caption font-bold">
                            -{product.discount}%
                          </div>
                        )}
                        <button className="absolute top-2 left-2 p-2 rounded-full bg-white/80 dark:bg-surface-dark/80 hover:bg-white dark:hover:bg-surface-dark transition-colors">
                          <Heart size={16} className="text-burgundy" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                          {product.name}
                        </h3>
                        <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark mb-3">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-honey fill-honey" />
                            <span className="text-caption font-medium">{product.rating}</span>
                          </div>
                          <span className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price & Action */}
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <p className="text-label font-bold text-text-primary-light dark:text-text-primary-dark">
                              {product.currency === 'BoneCoin' ? (
                                <span className="flex items-center gap-1">
                                  {product.price} <BoneIcon size={16} />
                                </span>
                              ) : (
                                formatCurrency(product.price, product.currency)
                              )}
                            </p>
                            {product.discount && (
                              <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark line-through">
                                {product.price * (1 + product.discount / 100)}
                              </p>
                            )}
                          </div>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => addToCart(product.id)}
                          >
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Корзина' && (
            <>
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <Card key={item.product.id} className="p-4" elevation={1}>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-honey/20 to-sky/20 flex items-center justify-center text-3xl flex-shrink-0">
                            {item.product.image}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-label font-bold text-sky">
                              {item.product.currency === 'BoneCoin' 
                                ? `${item.product.price} 🦴` 
                                : formatCurrency(item.product.price, item.product.currency)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="w-8 h-8 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center hover:bg-danger/20 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-label font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item.product.id)}
                              className="w-8 h-8 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center hover:bg-success/20 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Total */}
                  <Card className="p-6 bg-gradient-to-br from-sky to-info text-white" elevation={3}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-title font-bold">Итого</h3>
                      <p className="text-display font-bold">
                        {cartTotal} 🦴
                      </p>
                    </div>
                    <Button variant="secondary" fullWidth size="lg">
                      Оформить заказ
                    </Button>
                  </Card>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingCart size={64} className="text-text-secondary-light dark:text-text-secondary-dark mb-4" />
                  <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    Корзина пуста
                  </h3>
                  <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    Добавьте товары или услуги в корзину
                  </p>
                  <Button variant="primary" onClick={() => setActiveTab('Товары')}>
                    К покупкам
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}


