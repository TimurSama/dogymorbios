import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Sidebar } from '@/components/navigation/Sidebar'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dogymorbis — Социальная сеть для владельцев собак',
  description: 'Гуляй, общайся, получай косточки. Единая платформа для владельцев собак с картой прогулок, соцсетью, маркетплейсом и DAO.',
  keywords: ['собаки', 'выгул', 'социальная сеть', 'владельцы собак', 'BoneCoin', 'DAO', 'маркетплейс'],
  authors: [{ name: 'Dogymorbis Team' }],
  creator: 'Dogymorbis',
  publisher: 'Dogymorbis',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://dogymorbis.com',
    title: 'Dogymorbis — Социальная сеть для владельцев собак',
    description: 'Гуляй, общайся, получай косточки',
    siteName: 'Dogymorbis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dogymorbis',
    description: 'Гуляй, общайся, получай косточки',
    creator: '@dogymorbis',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#2C2B29' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <main className="pb-20 safe-area-bottom">
              {children}
            </main>
            <BottomNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

