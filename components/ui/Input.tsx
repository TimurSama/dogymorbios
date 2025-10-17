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
          <label className="block text-body font-medium text-text-primary-light dark:text-text-primary-dark mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full px-4 py-2.5 rounded-md text-body',
              'bg-surface-light dark:bg-surface-dark',
              'text-text-primary-light dark:text-text-primary-dark',
              'border border-line-light dark:border-line-dark',
              'placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark',
              'focus:outline-none focus:ring-2 focus:ring-honey focus:border-transparent',
              'transition-all duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-danger focus:ring-danger',
              icon && 'pl-10',
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
            error ? 'text-danger' : 'text-text-secondary-light dark:text-text-secondary-dark'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'


