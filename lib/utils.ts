import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatCurrency(amount: number, currency: string = 'RUB'): string {
  // Для кастомных валют (BoneCoin, etc.) форматируем вручную
  const customCurrencies = ['BoneCoin', 'DOGY']
  if (customCurrencies.includes(currency)) {
    return `${amount.toLocaleString('ru-RU')} ${currency}`
  }
  
  try {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  } catch {
    // Если валюта не поддерживается, возвращаем просто число с символом
    return `${amount.toLocaleString('ru-RU')} ${currency}`
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

