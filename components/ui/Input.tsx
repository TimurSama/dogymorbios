'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    icon,
    type = 'text',
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <div className="w-full">
        {label && (
          <label className="block text-body font-medium text-[var(--md-sys-color-on-surface)] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-on-surface-variant)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full px-4 py-3 rounded-lg text-body',
              'bg-[var(--md-sys-color-surface)]',
              'text-[var(--md-sys-color-on-surface)]',
              'border border-[var(--md-sys-color-outline-variant)]',
              'placeholder:text-[var(--md-sys-color-on-surface-variant)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:ring-opacity-50 focus:border-[var(--md-sys-color-primary)]',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'touch-target',
              error && 'border-[var(--md-sys-color-error)] focus:ring-[var(--md-sys-color-error)]',
              icon && 'pl-10',
              focused && 'elevation-1',
              className
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={cn(
            'mt-1.5 text-caption',
            error ? 'text-[var(--md-sys-color-error)]' : 'text-[var(--md-sys-color-on-surface-variant)]'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'


