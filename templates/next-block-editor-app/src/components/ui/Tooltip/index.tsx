'use client'

import Tippy from '@tippyjs/react'
import { useCallback, useState } from 'react'
import { Surface } from '../Surface'

interface TooltipProps {
  children: React.ReactNode
  content?: React.ReactNode
  disabled?: boolean
  tippyOptions?: any
}

export const Tooltip = ({ children, content, disabled, tippyOptions }: TooltipProps) => {
  const [mounted, setMounted] = useState(false)

  const renderTooltip = useCallback(
    () => (
      <Surface className="px-2 py-1 text-xs font-medium text-center text-neutral-600 dark:text-neutral-400">
        {content}
      </Surface>
    ),
    [content],
  )

  // Only render Tippy after component mounts to avoid SSR issues
  if (!mounted) {
    return <>{children}</>
  }

  if (disabled || !content) {
    return <>{children}</>
  }

  return (
    <Tippy
      animation={false}
      delay={[500, 0]}
      duration={[300, 250]}
      touch={false}
      zIndex={99999}
      appendTo={() => document.body}  // Use function to avoid SSR issues
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tippyOptions}
      render={renderTooltip}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip
