'use client'

import { Modal } from '@/components/ui/Modal'
import { SoftButton } from '@/components/ui/SoftButton'
import { SoftCard } from '@/components/ui/SoftCard'
import { ReactNode } from 'react'

interface WhitepaperPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon?: ReactNode
  content: ReactNode
  relatedPopups?: Array<{ title: string; onClick: () => void }>
}

/**
 * Попап для вайтпэпера с детальной информацией
 */
export function WhitepaperPopup({
  isOpen,
  onClose,
  title,
  icon,
  content,
  relatedPopups = [],
}: WhitepaperPopupProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <div className="space-y-6">
        {icon && (
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}

        <div className="prose prose-plush max-w-none">
          {content}
        </div>

        {relatedPopups.length > 0 && (
          <div className="border-t border-plush-graphite/10 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-plush-graphite mb-4">
              Связанные темы
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedPopups.map((popup, i) => (
                <SoftButton
                  key={i}
                  variant="ghost"
                  size="sm"
                  onClick={popup.onClick}
                >
                  {popup.title}
                </SoftButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
