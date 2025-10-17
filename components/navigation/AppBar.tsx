'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-14 flex items-center justify-between px-4',
        transparent
          ? 'bg-transparent'
          : 'bg-surface-light dark:bg-surface-dark border-b border-line-light dark:border-line-dark',
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors state-layer"
          >
            <ArrowLeft size={20} className="text-text-primary-light dark:text-text-primary-dark" />
          </button>
        )}
        <h1 className="text-label font-semibold text-text-primary-light dark:text-text-primary-dark">
          {title}
        </h1>
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  )
}


