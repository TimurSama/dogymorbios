'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'

interface AppBarProps {
  title: string
  showBack?: boolean
  actions?: React.ReactNode
  transparent?: boolean
  className?: string
}

export function AppBar({ 
  title, 
  showBack = false, 
  actions, 
  transparent = false,
  className 
}: AppBarProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 h-14 flex items-center justify-between px-4',
          'bg-[var(--surface)] border-b border-[var(--outline)]',
          'backdrop-blur-sm bg-opacity-80',
          transparent && 'bg-transparent border-transparent',
          className
        )}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Бургер-меню в хедере */}
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg state-layer touch-target flex-shrink-0"
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={20} className="text-[var(--text-primary)]" />
          </motion.button>

          {showBack && (
            <motion.button
              onClick={() => router.back()}
              className="p-2 rounded-lg state-layer touch-target flex-shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-[var(--text-primary)]" />
            </motion.button>
          )}
          
          <h1 className="text-label font-semibold text-[var(--text-primary)] truncate">
            {title}
          </h1>
        </div>
        
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}


