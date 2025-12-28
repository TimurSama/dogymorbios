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
import { 
  FoodIcon, ToyIcon, LeashIcon, CollarIcon, SmartCollarIcon, 
  ClothesIcon, BoneIcon 
} from '@/components/icons/DogIcons'
import { BowlIcon } from '@/components/icons/DogymorbisIcons'

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: 'BoneCoin' | 'RUB'
  rating: number
  reviews: number
  category: 'food' | 'smart-gadgets' | 'toys' | 'accessories' | 'clothes'
  image: string
  inStock: boolean
  discount?: number
  brand?: string
  weight?: string
  age?: string
}

const mockProducts: Product[] = [
  // Питание
  {
    id: '1',
    name: 'Royal Canin Adult для средних собак',
    description: 'Сухой корм для собак средних пород (10-25 кг), 15 кг. Сбалансированное питание с витаминами и минералами.',
    price: 4500,
    currency: 'RUB',
    rating: 4.8,
    reviews: 1247,
    category: 'food',
    image: 'food',
    inStock: true,
    brand: 'Royal Canin',
    weight: '15 кг',
    age: 'Взрослые (1-7 лет)',
  },
  {
    id: '2',
    name: 'Hill\'s Science Plan для щенков',
    description: 'Сухой корм для щенков крупных пород, 14 кг. Поддержка здорового роста и развития.',
    price: 5200,
    currency: 'RUB',
    rating: 4.9,
    reviews: 892,
    category: 'food',
    image: 'food',
    inStock: true,
    brand: 'Hill\'s',
    weight: '14 кг',
    age: 'Щенки',
    discount: 15,
  },
  {
    id: '3',
    name: 'Лакомства Pedigree DentaStix',
    description: 'Лакомства для чистки зубов, 28 палочек. Удаляет зубной налёт и освежает дыхание.',
    price: 350,
    currency: 'RUB',
    rating: 4.6,
    reviews: 2156,
    category: 'food',
    image: 'food',
    inStock: true,
    brand: 'Pedigree',
    weight: '420 г',
  },
  
  // Умные гаджеты
  {
    id: '4',
    name: 'Умный ошейник Fi Series 3',
    description: 'GPS-трекер для собак с приложением. Отслеживание активности, местоположения и здоровья. Водонепроницаемый.',
    price: 12000,
    currency: 'RUB',
    rating: 4.7,
    reviews: 456,
    category: 'smart-gadgets',
    image: 'smart',
    inStock: true,
    brand: 'Fi',
  },
  {
    id: '5',
    name: 'Автоматическая кормушка PetSafe',
    description: 'Программируемая кормушка на 5 порций. Таймер, голосовая запись, диспенсер для сухого корма.',
    price: 8500,
    currency: 'RUB',
    rating: 4.5,
    reviews: 312,
    category: 'smart-gadgets',
    image: 'smart',
    inStock: true,
    brand: 'PetSafe',
    discount: 10,
  },
  {
    id: '6',
    name: 'Умная миска для воды Petkit',
    description: 'Автоматическая поилка с фильтром, 3.5 литра. Индикатор уровня воды, тихая работа.',
    price: 3200,
    currency: 'RUB',
    rating: 4.8,
    reviews: 678,
    category: 'smart-gadgets',
    image: 'smart',
    inStock: true,
    brand: 'Petkit',
  },
  
  // Игрушки
  {
    id: '7',
    name: 'Интерактивная игрушка Kong Classic',
    description: 'Резиновая игрушка-головоломка для лакомств. Развивает интеллект, подходит для всех пород.',
    price: 850,
    currency: 'RUB',
    rating: 4.9,
    reviews: 3421,
    category: 'toys',
    image: 'toy',
    inStock: true,
    brand: 'Kong',
  },
  {
    id: '8',
    name: 'Мяч для собак Chuckit! Ultra',
    description: 'Прочный резиновый мяч для активных игр. Высокий отскок, яркий цвет, легко моется.',
    price: 450,
    currency: 'RUB',
    rating: 4.7,
    reviews: 1890,
    category: 'toys',
    image: 'toy',
    inStock: true,
    brand: 'Chuckit!',
  },
  {
    id: '9',
    name: 'Канат для перетягивания Tug-A-Jug',
    description: 'Интерактивная игрушка с лакомствами. Развивает силу челюстей и интеллект.',
    price: 1200,
    currency: 'RUB',
    rating: 4.6,
    reviews: 567,
    category: 'toys',
    image: 'toy',
    inStock: true,
    brand: 'Tug-A-Jug',
  },
  
  // Аксессуары
  {
    id: '10',
    name: 'Поводок-рулетка Flexi Giant',
    description: 'Автоматический поводок до 8 метров. Плавная блокировка, эргономичная ручка, прочный трос.',
    price: 2800,
    currency: 'RUB',
    rating: 4.8,
    reviews: 1234,
    category: 'accessories',
    image: 'leash',
    inStock: true,
    brand: 'Flexi',
  },
  {
    id: '11',
    name: 'Ошейник кожаный с гравировкой',
    description: 'Кожаный ошейник премиум-класса. Регулируемый размер, металлическая фурнитура, гравировка имени.',
    price: 1500,
    currency: 'RUB',
    rating: 4.9,
    reviews: 890,
    category: 'accessories',
    image: 'collar',
    inStock: true,
    brand: 'Premium',
  },
  {
    id: '12',
    name: 'Шлейка для собак Julius-K9',
    description: 'Профессиональная шлейка с нагрудной пластиной. Удобная, прочная, подходит для активных прогулок.',
    price: 3200,
    currency: 'RUB',
    rating: 4.7,
    reviews: 1456,
    category: 'accessories',
    image: 'collar',
    inStock: true,
    brand: 'Julius-K9',
  },
  
  // Одежда
  {
    id: '13',
    name: 'Комбинезон зимний для собак',
    description: 'Тёплый комбинезон на зиму. Водонепроницаемый материал, утепление, светоотражающие элементы.',
    price: 2500,
    currency: 'RUB',
    rating: 4.6,
    reviews: 678,
    category: 'clothes',
    image: 'clothes',
    inStock: true,
    brand: 'DogStyle',
  },
  {
    id: '14',
    name: 'Дождевик для собак',
    description: 'Лёгкий дождевик из ПВХ. Защита от дождя, удобные застёжки, яркий цвет для безопасности.',
    price: 1200,
    currency: 'RUB',
    rating: 4.5,
    reviews: 432,
    category: 'clothes',
    image: 'clothes',
    inStock: true,
    brand: 'RainGuard',
  },
  {
    id: '15',
    name: 'Свитер вязаный для собак',
    description: 'Мягкий вязаный свитер. Тёплый, удобный, стильный дизайн. Подходит для дома и прогулок.',
    price: 1800,
    currency: 'RUB',
    rating: 4.8,
    reviews: 923,
    category: 'clothes',
    image: 'clothes',
    inStock: true,
    brand: 'CozyPaws',
  },
]

const categories = [
  { id: 'all', label: 'Все', icon: <FoodIcon size={18} /> },
  { id: 'food', label: 'Питание', icon: <FoodIcon size={18} /> },
  { id: 'smart-gadgets', label: 'Умные гаджеты', icon: <SmartCollarIcon size={18} /> },
  { id: 'toys', label: 'Игрушки', icon: <ToyIcon size={18} /> },
  { id: 'accessories', label: 'Аксессуары', icon: <LeashIcon size={18} /> },
  { id: 'clothes', label: 'Одежда', icon: <ClothesIcon size={18} /> },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'food': return <FoodIcon size={24} />
    case 'smart-gadgets': return <SmartCollarIcon size={24} />
    case 'toys': return <ToyIcon size={24} />
    case 'accessories': return <LeashIcon size={24} />
    case 'clothes': return <ClothesIcon size={24} />
    default: return <BoneIcon size={24} />
  }
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{[key: string]: number}>({})

  const filteredProducts = mockProducts.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const cartItems = Object.keys(cart).map(id => ({
    product: mockProducts.find(p => p.id === id)!,
    quantity: cart[id]
  })).filter(item => item.product && item.quantity > 0)

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

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
    <div className="flex flex-col h-screen bg-[var(--md-sys-color-background)] safe-area-top">
      <AppBar 
        title="Магазин" 
        actions={
          <motion.button 
            className="relative p-2 rounded-lg state-layer touch-target"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} className="text-[var(--md-sys-color-on-surface)]" />
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--dog-burgundy)] rounded-full flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </motion.div>
            )}
          </motion.button>
        }
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto p-4 space-y-4 pb-24">
          {/* Search */}
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar scrollbar-hide">
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

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Card className="h-full flex flex-col" elevation={2} interactive>
                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-[var(--dog-honey)]/20 to-[var(--dog-sky)]/20 flex items-center justify-center rounded-t-lg">
                      <div className="text-[var(--dog-sky)]">
                        {getCategoryIcon(product.category)}
                      </div>
                      {product.discount && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 bg-[var(--dog-danger)] text-white px-2 py-1 rounded-full text-caption font-bold"
                        >
                          -{product.discount}%
                        </motion.div>
                      )}
                      <motion.button
                        className="absolute top-2 left-2 p-2 rounded-full bg-[var(--md-sys-color-surface)]/80 backdrop-blur-sm state-layer touch-target"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={16} className="text-[var(--dog-burgundy)]" />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {product.brand && (
                        <span className="text-caption text-[var(--md-sys-color-on-surface-variant)] mb-1">
                          {product.brand}
                        </span>
                      )}
                      <h3 className="text-body font-bold text-[var(--md-sys-color-on-surface)] mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-caption text-[var(--md-sys-color-on-surface-variant)] mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Details */}
                      {(product.weight || product.age) && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.weight && (
                            <span className="text-caption px-2 py-1 rounded-full bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)]">
                              {product.weight}
                            </span>
                          )}
                          {product.age && (
                            <span className="text-caption px-2 py-1 rounded-full bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)]">
                              {product.age}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-[var(--dog-honey)] fill-[var(--dog-honey)]" />
                          <span className="text-caption font-medium text-[var(--md-sys-color-on-surface)]">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-caption text-[var(--md-sys-color-on-surface-variant)]">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price & Action */}
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div>
                          <p className="text-label font-bold text-[var(--md-sys-color-on-surface)]">
                            {product.currency === 'BoneCoin' ? (
                              <span className="flex items-center gap-1">
                                {product.price} <BoneIcon size={16} className="text-[var(--dog-honey)]" />
                              </span>
                            ) : (
                              formatCurrency(product.price, product.currency)
                            )}
                          </p>
                          {product.discount && (
                            <p className="text-caption text-[var(--md-sys-color-on-surface-variant)] line-through">
                              {formatCurrency(Math.round(product.price / (1 - product.discount / 100)), product.currency)}
                            </p>
                          )}
                        </div>
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => addToCart(product.id)}
                            className="touch-target"
                          >
                            В корзину
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Search size={64} className="text-[var(--md-sys-color-on-surface-variant)] mb-4" />
              <h3 className="text-title font-bold text-[var(--md-sys-color-on-surface)] mb-2">
                Товары не найдены
              </h3>
              <p className="text-body text-[var(--md-sys-color-on-surface-variant)]">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cart Summary - Fixed Bottom */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-16 left-0 right-0 z-40 p-4 bg-[var(--md-sys-color-surface)] border-t border-[var(--md-sys-color-outline-variant)] shadow-soft-lg safe-area-bottom"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-caption text-[var(--md-sys-color-on-surface-variant)]">
                В корзине {cartCount} {cartCount === 1 ? 'товар' : cartCount < 5 ? 'товара' : 'товаров'}
              </p>
              <p className="text-label font-bold text-[var(--md-sys-color-on-surface)]">
                {formatCurrency(cartTotal, 'RUB')}
              </p>
            </div>
            <Button variant="primary" size="lg">
              Оформить заказ
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
