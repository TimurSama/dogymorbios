'use client'

import { motion } from 'framer-motion'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

// Кастомные иконки в стиле собачьей тематики
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
      <path d="M3 21h18M5 21V11l7-7 7 7v10M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
      <path d="M8 11h8M10 7h4" />
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
      <path d="M6 12c0-2 1-3 3-3s3 1 3 3-1 3-3 3-3-1-3-3z" />
      <path d="M18 12c0-2 1-3 3-3s3 1 3 3-1 3-3 3-3-1-3-3z" />
      <path d="M6 12h12" />
      <path d="M9 9v6M15 9v6" />
    </svg>
  )
}

export function ToyIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
    </svg>
  )
}

export function TailIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M3 12c2-4 6-6 9-4s5 6 3 9-6 5-9 3-2-6 0-9 4-2 6 1" />
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
      <path d="M4 8h16M4 8c0 4 2 6 6 6h4c4 0 6-2 6-6M4 8l2-4h12l2 4" />
      <path d="M8 14h8" />
    </svg>
  )
}

export function LeashIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M6 4h12M6 4c0 2 2 4 4 4h4c2 0 4-2 4-4M6 4v16M18 4v16" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export function CollarIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  )
}

export function SmartCollarIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M8 8l2 2M16 8l-2 2M8 16l2-2M16 16l-2-2" />
    </svg>
  )
}

export function FoodIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M6 8h12M6 8c0 2 1 3 3 3h6c2 0 3-1 3-3M6 8l1-4h10l1 4" />
      <path d="M8 12h8M10 16h4" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
    </svg>
  )
}

export function ClothesIcon({ size = 24, className = '', strokeWidth = 2 }: IconProps) {
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
      <path d="M12 2v4M12 2c-2 0-4 2-4 4v12h8V6c0-2-2-4-4-4z" />
      <path d="M8 8h8M8 12h8" />
    </svg>
  )
}

