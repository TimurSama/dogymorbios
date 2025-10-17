'use client'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

export function DoghouseIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 20V10L12 3L21 10V20H3Z" />
      <path d="M9 20V14H15V20" />
    </svg>
  )
}

export function EarBubbleIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5C21 16.75 16.97 21 12 21C11.16 21 10.36 20.89 9.59 20.67L4 22L5.5 17C4.57 15.64 4 13.93 4 12C4 7.03 7.58 3 12 3C13.5 3 14.9 3.41 16.08 4.14" />
      <path d="M16 3C17.66 3 19 4.34 19 6C19 7.66 17.66 9 16 9" />
    </svg>
  )
}

export function PawHeartIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" />
      <ellipse cx="8" cy="10" rx="1.5" ry="2" />
      <ellipse cx="16" cy="10" rx="1.5" ry="2" />
      <ellipse cx="12" cy="7" rx="1.5" ry="2" />
    </svg>
  )
}

export function MedallionIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="14" r="7" />
      <path d="M8 7L12 3L16 7" />
      <path d="M12 3V7" />
      <path d="M10 14L11 16L14 12" />
    </svg>
  )
}

export function BowlIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11C4 11 4 8 7 8C10 8 10 11 10 11" />
      <path d="M14 11C14 11 14 8 17 8C20 8 20 11 20 11" />
      <path d="M3 11H21C21 15.97 16.97 20 12 20C7.03 20 3 15.97 3 11Z" />
    </svg>
  )
}

export function TreeIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L8 8H16L12 2Z" />
      <path d="M10 7L6 13H18L14 7" />
      <path d="M12 13V22" />
      <path d="M9 22H15" />
    </svg>
  )
}

export function PawIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="7" cy="8" rx="2" ry="2.5" />
      <ellipse cx="12" cy="6" rx="2" ry="2.5" />
      <ellipse cx="17" cy="8" rx="2" ry="2.5" />
      <ellipse cx="9" cy="13" rx="1.5" ry="2" />
      <ellipse cx="15" cy="13" rx="1.5" ry="2" />
      <path d="M8.5 16C8.5 16 9.5 18 12 18C14.5 18 15.5 16 15.5 16" />
    </svg>
  )
}

export function BoneIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="5" cy="7" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M7.5 8.5L16.5 15.5" />
      <path d="M16.5 8.5L7.5 15.5" />
    </svg>
  )
}


