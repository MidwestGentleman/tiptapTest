'use client'

import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface FormBuilderHeaderProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const FormBuilderHeader = ({ isDarkMode, toggleDarkMode }: FormBuilderHeaderProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex items-center gap-x-1.5">
        <Toolbar.Button
          tooltip="Back to Editor"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3"
        >
          <Icon name="ArrowLeft" />
          <span className="text-sm">Back</span>
        </Toolbar.Button>
      </div>
      <div className="flex items-center gap-x-1.5">
        <Toolbar.Button
          tooltip={isDarkMode ? 'Light mode' : 'Dark mode'}
          onClick={toggleDarkMode}
        >
          <Icon name={isDarkMode ? 'Sun' : 'Moon'} />
        </Toolbar.Button>
      </div>
    </div>
  )
} 