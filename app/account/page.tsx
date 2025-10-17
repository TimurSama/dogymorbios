'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Settings, Edit2, Plus, MapPin, Calendar, Award } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getDogsByUserId, Dog, createDog, updateUser as dbUpdateUser } from '@/lib/db'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip } from '@/components/ui/Chip'
import { PawIcon } from '@/components/icons/DogymorbisIcons'

const tabs = ['Профиль', 'Питомцы', 'Достижения']

export default function AccountPage() {
  const { user, isLoading, updateUser } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Профиль')
  const [dogs, setDogs] = useState<Dog[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [showAddDog, setShowAddDog] = useState(false)
  
  // Форма редактирования профиля
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
  })

  // Форма добавления собаки
  const [dogForm, setDogForm] = useState({
    name: '',
    breed: '',
    age: 0,
    weight: 0,
    gender: 'male' as 'male' | 'female',
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth')
    }
    
    if (user) {
      setProfileForm({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        phone: user.phone || '',
      })
      
      // Загрузить собак
      const userDogs = getDogsByUserId(user.id)
      setDogs(userDogs)
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
      </div>
    )
  }

  const handleSaveProfile = () => {
    if (user) {
      const updated = dbUpdateUser(user.id, profileForm)
      if (updated) {
        updateUser(updated)
      }
    }
    setIsEditing(false)
  }

  const handleAddDog = () => {
    if (!user) return
    
    const newDog = createDog({
      ...dogForm,
      userId: user.id,
      personality: [],
    })
    
    setDogs([...dogs, newDog])
    setShowAddDog(false)
    setDogForm({
      name: '',
      breed: '',
      age: 0,
      weight: 0,
      gender: 'male',
    })
  }

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
    : 'Недавно'

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Мой профиль" 
        actions={
          <Button variant="ghost" className="!p-2" onClick={() => router.push('/settings')}>
            <Settings size={20} />
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="m-4 p-6" elevation={2}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl text-white mb-3">
                  {user.avatar || user.name.charAt(0).toUpperCase()}
                </div>
                <Button size="sm" variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 size={14} className="mr-1" />
                  {isEditing ? 'Отменить' : 'Редактировать'}
                </Button>
              </div>

              {/* Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Имя"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                    <Input
                      label="О себе"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      placeholder="Расскажите о себе и своих питомцах"
                    />
                    <Input
                      label="Город"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      placeholder="Москва, Россия"
                    />
                    <Input
                      label="Телефон"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                    />
                    <Button onClick={handleSaveProfile}>Сохранить</Button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      @{user.username}
                    </p>
                    
                    {user.bio ? (
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{user.bio}</p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-500 italic mb-3">
                        Расскажите о себе (нажмите &quot;Редактировать&quot;)
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {user.location ? (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{user.location}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <MapPin size={14} />
                          <span>Укажите город</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>С {joinDate}</span>
                      </div>
                    </div>

                    {/* Placeholder Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">0</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Посты</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">0</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Друзья</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">0 км</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Пройдено</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-yellow-600">0 🦴</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">BoneCoin</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mx-4 rounded-t-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-blue-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabAccount"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'Питомцы' && (
              <div className="space-y-4">
                {dogs.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {dogs.map((dog) => (
                      <Card key={dog.id} className="p-4" elevation={2}>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-3xl text-white">
                            🐕
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {dog.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {dog.breed}, {dog.age} {dog.age === 1 ? 'год' : 'года'} • {dog.weight} кг
                            </p>
                            <Chip label={dog.gender === 'male' ? 'Мальчик' : 'Девочка'} />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <PawIcon size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      У вас пока нет питомцев
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Добавьте информацию о своей собаке
                    </p>
                  </Card>
                )}

                {showAddDog ? (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Добавить питомца</h3>
                    <div className="space-y-4">
                      <Input
                        label="Кличка"
                        value={dogForm.name}
                        onChange={(e) => setDogForm({ ...dogForm, name: e.target.value })}
                      />
                      <Input
                        label="Порода"
                        value={dogForm.breed}
                        onChange={(e) => setDogForm({ ...dogForm, breed: e.target.value })}
                      />
                      <Input
                        label="Возраст (лет)"
                        type="number"
                        value={dogForm.age}
                        onChange={(e) => setDogForm({ ...dogForm, age: parseInt(e.target.value) || 0 })}
                      />
                      <Input
                        label="Вес (кг)"
                        type="number"
                        value={dogForm.weight}
                        onChange={(e) => setDogForm({ ...dogForm, weight: parseInt(e.target.value) || 0 })}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleAddDog}>Сохранить</Button>
                        <Button variant="secondary" onClick={() => setShowAddDog(false)}>Отмена</Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Button onClick={() => setShowAddDog(true)} fullWidth>
                    <Plus size={20} className="mr-2" />
                    Добавить питомца
                  </Button>
                )}
              </div>
            )}

            {activeTab === 'Достижения' && (
              <Card className="p-8 text-center">
                <Award size={64} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Здесь будут ваши достижения
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Выполняйте задания и получайте награды!
                </p>
              </Card>
            )}

            {activeTab === 'Профиль' && !isEditing && (
              <Card className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Здесь будет отображаться ваша активность и посты
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
