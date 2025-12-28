'use client'

interface AvatarIconProps {
  size?: number
  className?: string
}

// Кастомные аватары для людей и собак
export function PersonAvatar({ size = 24, className = '' }: AvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6" />
    </svg>
  )
}

export function DogAvatar({ size = 24, className = '' }: AvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5v6h10v-6c1-1 2-3 2-5 0-4-3-7-7-7z" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <path d="M9 13h6" />
      <path d="M7 19h10" />
    </svg>
  )
}

export function HappyDog({ size = 24, className = '' }: AvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="12" rx="8" ry="6" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <path d="M9 14c1 1 2 1 3 0s2-1 3 0" />
      <path d="M6 8l2 2M18 8l-2 2" />
    </svg>
  )
}

export function ActiveDog({ size = 24, className = '' }: AvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 4h8M8 4c-2 0-4 2-4 4v8c0 2 2 4 4 4h8c2 0 4-2 4-4V8c0-2-2-4-4-4" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
      <path d="M10 14h4" />
      <path d="M6 6l2 2M18 6l-2 2" />
    </svg>
  )
}

