'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Image, Mic, Send, MoreVertical } from 'lucide-react'
import { AppBar } from '@/components/navigation/AppBar'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/lib/utils'
import { EarBubbleIcon } from '@/components/icons/DogymorbisIcons'

interface Chat {
  id: string
  name: string
  dogName: string
  avatar: string
  dogAvatar: string
  lastMessage: string
  timestamp: Date
  unread: number
  online: boolean
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  isOwn: boolean
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Анна',
    dogName: 'Рекс',
    avatar: '👩',
    dogAvatar: '🐕',
    lastMessage: 'Отлично! Встретимся завтра в парке',
    timestamp: new Date(Date.now() - 600000),
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Дмитрий',
    dogName: 'Белла',
    avatar: '👨',
    dogAvatar: '🦮',
    lastMessage: 'Спасибо за совет по дрессировке!',
    timestamp: new Date(Date.now() - 3600000),
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Мария',
    dogName: 'Чарли',
    avatar: '👩‍🦰',
    dogAvatar: '🐩',
    lastMessage: 'Да, конечно! Поделюсь контактом грумера',
    timestamp: new Date(Date.now() - 7200000),
    unread: 1,
    online: true,
  },
]

const mockMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Привет! Как дела у Рекса?', timestamp: new Date(Date.now() - 3600000), isOwn: false },
  { id: '2', senderId: 'me', text: 'Привет! Всё отлично, сегодня много гуляли', timestamp: new Date(Date.now() - 3000000), isOwn: true },
  { id: '3', senderId: '1', text: 'Здорово! Может завтра встретимся в парке?', timestamp: new Date(Date.now() - 1800000), isOwn: false },
  { id: '4', senderId: 'me', text: 'Отлично! Встретимся завтра в парке', timestamp: new Date(Date.now() - 600000), isOwn: true },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messageText, setMessageText] = useState('')

  const filteredChats = searchQuery
    ? mockChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.dogName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChats

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen">
        <AppBar 
          title={`${selectedChat.name} и ${selectedChat.dogName}`}
          showBack
          actions={
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
              <MoreVertical size={20} />
            </button>
          }
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-4 space-y-3">
          {mockMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                {!message.isOwn && (
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-lg">
                      {selectedChat.avatar}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-honey border-2 border-white dark:border-surface-dark flex items-center justify-center text-[8px]">
                      {selectedChat.dogAvatar}
                    </div>
                  </div>
                )}
                <div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.isOwn
                      ? 'bg-sky text-white'
                      : 'bg-surface-light dark:bg-surface-dark elevation-1'
                  }`}>
                    <p className={`text-body ${
                      message.isOwn ? 'text-white' : 'text-text-primary-light dark:text-text-primary-dark'
                    }`}>
                      {message.text}
                    </p>
                  </div>
                  <p className={`text-caption text-text-secondary-light dark:text-text-secondary-dark mt-1 ${
                    message.isOwn ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark p-4">
          <div className="flex items-end gap-2">
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
              <Image size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
            </button>
            <div className="flex-1 bg-surface2-light dark:bg-surface2-dark rounded-lg px-4 py-2">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Написать сообщение..."
                className="w-full bg-transparent text-body text-text-primary-light dark:text-text-primary-dark outline-none resize-none"
                rows={1}
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
              <Mic size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
            </button>
            <button className="p-2 rounded-lg bg-sky text-white">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar 
        title="Сообщения" 
        actions={
          <Button variant="ghost" className="!p-2">
            <Plus size={20} />
          </Button>
        }
      />

      {/* Search */}
      <div className="p-4 bg-surface-light dark:bg-surface-dark border-b border-line-light dark:border-line-dark">
        <Input
          placeholder="Поиск чатов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={16} />}
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        {filteredChats.length > 0 ? (
          <div className="divide-y divide-line-light dark:divide-line-dark">
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedChat(chat)}
              >
                <Card 
                  className="p-4 m-2 cursor-pointer" 
                  elevation={1}
                  interactive
                >
                  <div className="flex items-start gap-3">
                    {/* Double Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-surface2-light dark:bg-surface2-dark flex items-center justify-center text-2xl">
                        {chat.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-honey border-2 border-white dark:border-surface-dark flex items-center justify-center text-sm">
                        {chat.dogAvatar}
                      </div>
                      {chat.online && (
                        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-white dark:border-surface-dark" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-body font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {chat.name} и {chat.dogName}
                        </h4>
                        <span className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-body truncate ${
                          chat.unread > 0
                            ? 'font-medium text-text-primary-light dark:text-text-primary-dark'
                            : 'text-text-secondary-light dark:text-text-secondary-dark'
                        }`}>
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <div className="ml-2 min-w-[20px] h-5 px-1.5 bg-sky rounded-full flex items-center justify-center">
                            <span className="text-caption font-bold text-white">{chat.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <EarBubbleIcon size={64} className="text-text-secondary-light dark:text-text-secondary-dark mb-4" />
            <h3 className="text-title font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Чаты не найдены
            </h3>
            <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
              Начните общаться с другими владельцами собак
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


