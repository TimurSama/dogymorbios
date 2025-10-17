'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Heart, MessageCircle, Share2, MoreHorizontal, MapPin } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PawHeartIcon } from '@/components/icons/DogymorbisIcons'
import { formatTime } from '@/lib/utils'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    dogName: string
    dogAvatar: string
  }
  content: string
  images?: string[]
  location?: string
  timestamp: Date
  likes: number
  comments: number
  boneCoin: number
  isLiked: boolean
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Анна Иванова',
      avatar: '👩',
      dogName: 'Рекс',
      dogAvatar: '🐕',
    },
    content: 'Сегодня прекрасная погода для прогулки! Рекс в восторге от новой площадки в парке 🌳',
    location: 'Парк Горького',
    timestamp: new Date(Date.now() - 3600000),
    likes: 24,
    comments: 5,
    boneCoin: 15,
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: 'Дмитрий Петров',
      avatar: '👨',
      dogName: 'Белла',
      dogAvatar: '🦮',
    },
    content: 'Белла освоила новую команду "дай лапу"! Горжусь своей умницей 🐾',
    timestamp: new Date(Date.now() - 7200000),
    likes: 42,
    comments: 12,
    boneCoin: 25,
    isLiked: true,
  },
  {
    id: '3',
    author: {
      name: 'Мария Соколова',
      avatar: '👩‍🦰',
      dogName: 'Чарли',
      dogAvatar: '🐩',
    },
    content: 'Кто-нибудь знает хорошего грумера на Юго-Западе? Чарли нужна стрижка перед выставкой',
    location: 'Юго-Западная',
    timestamp: new Date(Date.now() - 10800000),
    likes: 18,
    comments: 8,
    boneCoin: 10,
    isLiked: false,
  },
]

const tabs = ['Подписки', 'Топ', 'Группы', 'Рядом']

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('Подписки')
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Лента" 
        actions={
          <Button variant="ghost" className="!p-2">
            <Plus size={20} />
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark sticky top-14 z-30">
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
                layoutId="activeTabFeed"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-2xl mx-auto py-4 space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4" elevation={1}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3">
                    {/* Double Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-2xl">
                        {post.author.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-honey border-2 border-white dark:border-surface-dark flex items-center justify-center text-sm">
                        {post.author.dogAvatar}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-body text-text-primary-light dark:text-text-primary-dark">
                        {post.author.name} и {post.author.dogName}
                      </p>
                      <div className="flex items-center gap-2 text-caption text-text-secondary-light dark:text-text-secondary-dark">
                        <span>{formatTime(post.timestamp)}</span>
                        {post.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin size={12} />
                              <span>{post.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <MoreHorizontal size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-body text-text-primary-light dark:text-text-primary-dark mb-3">
                  {post.content}
                </p>

                {/* Image placeholder */}
                {post.images && (
                  <div className="mb-3 rounded-lg overflow-hidden bg-surface2-light dark:bg-surface2-dark aspect-video flex items-center justify-center">
                    <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                      📷 Фото
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-line-light dark:border-line-dark">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 group"
                    >
                      <PawHeartIcon 
                        size={20} 
                        className={`transition-colors ${
                          post.isLiked 
                            ? 'text-burgundy' 
                            : 'text-text-secondary-light dark:text-text-secondary-dark group-hover:text-burgundy'
                        }`}
                      />
                      <span className={`text-caption ${
                        post.isLiked 
                          ? 'text-burgundy font-semibold' 
                          : 'text-text-secondary-light dark:text-text-secondary-dark'
                      }`}>
                        {post.likes}
                      </span>
                    </button>

                    <button className="flex items-center gap-1.5 group">
                      <MessageCircle 
                        size={20} 
                        className="text-text-secondary-light dark:text-text-secondary-dark group-hover:text-sky transition-colors" 
                      />
                      <span className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                        {post.comments}
                      </span>
                    </button>

                    <button className="flex items-center gap-1.5 group">
                      <Share2 
                        size={20} 
                        className="text-text-secondary-light dark:text-text-secondary-dark group-hover:text-success transition-colors" 
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-caption text-honey font-semibold">
                    <span>+{post.boneCoin}</span>
                    <span>🦴</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-20 right-6 md:bottom-6 w-14 h-14 rounded-full bg-sky text-white elevation-3 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  )
}


