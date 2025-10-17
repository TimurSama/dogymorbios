# Dogymorbis — Руководство разработчика

## 📋 Содержание

- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Установка](#установка)
- [Разработка](#разработка)
- [Страницы приложения](#страницы-приложения)
- [Компоненты](#компоненты)
- [Дизайн-система](#дизайн-система)

## 🛠 Технологии

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + фирменные иконки

## 📁 Структура проекта

```
Dogymorbis/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Корневой layout
│   ├── page.tsx                 # Главная страница (редирект на /map)
│   ├── globals.css              # Глобальные стили и токены
│   ├── map/                     # Карта прогулок
│   ├── feed/                    # Социальная лента
│   ├── account/                 # Профиль пользователя
│   ├── journal/                 # Дневник прогулок
│   ├── wallet/                  # Кошелёк BoneCoin
│   ├── messages/                # Мессенджер
│   ├── dating/                  # Друзья и дейтинг
│   ├── groups/                  # Группы по интересам
│   ├── events/                  # События и мероприятия
│   ├── tasks/                   # Геймификация и задания
│   ├── store/                   # Маркетплейс
│   ├── partner/                 # Партнёрская программа
│   ├── dao/                     # DAO управление
│   ├── settings/                # Настройки
│   └── presentation/            # Презентация проекта
├── components/
│   ├── ThemeProvider.tsx        # Провайдер тем
│   ├── ui/                      # UI-компоненты
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Chip.tsx
│   │   └── Loader.tsx
│   ├── navigation/              # Навигация
│   │   ├── AppBar.tsx
│   │   ├── BottomNav.tsx
│   │   └── Sidebar.tsx
│   └── icons/                   # Фирменные иконки
│       └── DogymorbisIcons.tsx
├── lib/
│   └── utils.ts                 # Утилиты
├── public/                      # Статические файлы
│   └── manifest.json            # PWA манифест
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## ⚙️ Установка

### Требования

- Node.js 18+ 
- npm/yarn/pnpm

### Шаги установки

1. **Установка зависимостей**
```bash
npm install
```

2. **Запуск в режиме разработки**
```bash
npm run dev
```

3. **Открыть в браузере**
```
http://localhost:3000
```

## 🚀 Разработка

### Скрипты

```bash
# Разработка
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-сервера
npm start

# Линтинг
npm run lint
```

### Переменные окружения

Создайте файл `.env.local`:

```env
# API Keys (если потребуется)
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📄 Страницы приложения

### Основные страницы

| Путь | Описание | Компоненты |
|------|----------|------------|
| `/map` | Карта прогулок с GPS-трекингом | MapView, Marker, FilterPanel |
| `/feed` | Социальная лента | PostCard, DoubleAvatar, Tabs |
| `/account` | Профиль и питомцы | ProfileHeader, PetTabs, Stats |
| `/journal` | Дневник с AI-анализом | JournalCalendar, EntryEditor |
| `/wallet` | Кошелёк BoneCoin | BalanceCard, TransactionList, NFTGrid |
| `/messages` | Чаты | ChatList, ChatWindow, MessageInput |
| `/dating` | Знакомства для собак | MatchCard, SwipeInterface |
| `/groups` | Группы по интересам | GroupList, GroupFeed |
| `/events` | События и мероприятия | EventList, EventCard |
| `/tasks` | Задания и геймификация | TaskList, ProgressBar, BadgeCollection |
| `/store` | Маркетплейс | ProductGrid, Cart, Checkout |
| `/partner` | Для бизнес-партнёров | Dashboard, Analytics, ReferralPanel |
| `/dao` | Децентрализованное управление | ProposalList, VoteInterface, Treasury |
| `/settings` | Настройки приложения | SettingsSections, ThemeToggle |
| `/presentation` | Презентация проекта | Slides, Navigation |

## 🎨 Компоненты

### UI-компоненты

#### Button
```tsx
<Button variant="primary" size="lg" fullWidth>
  Нажми меня
</Button>
```

Варианты: `primary`, `secondary`, `ghost`, `danger`
Размеры: `sm`, `md`, `lg`

#### Card
```tsx
<Card elevation={2} rounded="lg" interactive>
  Контент карточки
</Card>
```

Elevation: `0`, `1`, `2`, `3`
Rounded: `sm`, `md`, `lg`, `xl`

#### Input
```tsx
<Input 
  label="Email" 
  placeholder="example@mail.com"
  icon={<Mail size={16} />}
/>
```

#### Chip
```tsx
<Chip 
  label="Хаски" 
  selected={true}
  icon={<Dog size={14} />}
  onRemove={() => {}}
/>
```

#### Loader
```tsx
<Loader variant="ball" size={72} />
```

Варианты: `ball`, `pawtrail`, `medallion`

### Навигационные компоненты

#### AppBar
```tsx
<AppBar 
  title="Заголовок"
  showBack={true}
  actions={<Button>Действие</Button>}
/>
```

#### BottomNav
Автоматически отображается на всех страницах (мобильная версия).

#### Sidebar
Боковое меню, доступное через бургер-кнопку.

### Фирменные иконки

```tsx
import { 
  DoghouseIcon, 
  EarBubbleIcon, 
  PawHeartIcon,
  MedallionIcon,
  BowlIcon,
  TreeIcon,
  PawIcon,
  BoneIcon 
} from '@/components/icons/DogymorbisIcons'

<DoghouseIcon size={24} className="text-sky" strokeWidth={2} />
```

## 🎨 Дизайн-система

### Цветовая палитра

#### Светлая тема
- **Background**: `#FFFFFF`
- **Surface**: `#FAF8F5`
- **Surface-2**: `#F0ECE7`
- **Text Primary**: `#1C1A19`
- **Text Secondary**: `#58524D`

#### Тёмная тема
- **Background**: `#2C2B29`
- **Surface**: `#1F1E1C`
- **Surface-2**: `#3A3634`
- **Text Primary**: `#F5F4F2`
- **Text Secondary**: `#CFCAC5`

#### Акценты
- **Sky**: `#AFCBFF` (голубой)
- **Honey**: `#E8DCA8` (медовый)
- **Burgundy**: `#A95056` (бордовый)
- **Chocolate**: `#6B4B3E` (шоколадный)
- **Success**: `#86C8BC` (зелёный)
- **Warning**: `#E1A177` (оранжевый)
- **Danger**: `#E57C73` (красный)
- **Info**: `#7FA7D9` (синий)

### Типографика

```css
/* Caption */
text-caption /* 12px / 16px */

/* Body */
text-body /* 14px / 20px */

/* Label */
text-label /* 16px / 24px */

/* Title */
text-title /* 20px / 28px */

/* Display */
text-display /* 28px / 36px */
```

### Тени (Elevation)

```css
elevation-0 /* Без тени */
elevation-1 /* Лёгкая тень */
elevation-2 /* Средняя тень */
elevation-3 /* Заметная тень */
```

### Радиусы

```css
rounded-sm   /* 6px */
rounded-md   /* 8px */
rounded-lg   /* 12px */
rounded-xl   /* 16px */
```

### State Layer

Интерактивные элементы автоматически получают state-layer эффект:

```tsx
<div className="state-layer">
  {/* При наведении/нажатии появляется полупрозрачный слой */}
</div>
```

### Анимации

```tsx
// Spring появление
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
>
  Контент
</motion.div>

// Компрессия при нажатии
<motion.button whileTap={{ scale: 0.985 }}>
  Нажми
</motion.button>
```

## 🔧 Утилиты

```ts
import { cn, formatDate, formatTime, formatCurrency, truncate } from '@/lib/utils'

// Объединение классов
cn('base-class', condition && 'conditional-class')

// Форматирование даты
formatDate(new Date()) // "16 октября 2025"

// Форматирование времени
formatTime(new Date()) // "14:30"

// Форматирование валюты
formatCurrency(1250, 'BoneCoin') // "1,250 🦴"
formatCurrency(100, 'RUB') // "100 ₽"

// Обрезка текста
truncate('Длинный текст...', 20) // "Длинный текст..."
```

## 🌙 Темы

Переключение темы:

```tsx
import { useTheme } from '@/components/ThemeProvider'

const { theme, toggleTheme, setTheme } = useTheme()

// Переключить тему
toggleTheme()

// Установить конкретную тему
setTheme('dark')
```

## 📱 PWA

Приложение настроено как Progressive Web App:
- Манифест: `public/manifest.json`
- Может быть установлено на домашний экран
- Работает оффлайн (после первой загрузки)

## 🚢 Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Поддержка

- GitHub Issues: [создать issue]
- Email: support@dogymorbis.com
- Telegram: @dogymorbis_support

---

**Гуляй, общайся, получай косточки** 🦴


