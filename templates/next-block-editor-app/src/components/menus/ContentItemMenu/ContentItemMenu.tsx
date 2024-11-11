'use client'

import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback, useRef, useEffect, useState } from 'react'
import * as PopoverMenu from '@/components/ui/PopoverMenu'

import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'
import { MenuProps } from '../types'

export const ContentItemMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const shouldShow = useCallback(() => {
    if (!isMounted) return false
    return editor.isActive('paragraph') || editor.isActive('heading')
  }, [editor, isMounted])

  const onDelete = useCallback(() => {
    editor.chain().focus().deleteSelection().run()
  }, [editor])

  if (!isMounted) return null

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="contentItemMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => appendTo?.current || document.body,
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect: () => {
          const selection = window.getSelection()
          if (!selection?.rangeCount) return null
          const range = selection.getRangeAt(0)
          return range.getBoundingClientRect()
        },
      }}
      shouldShow={shouldShow}
    >
      <div ref={menuRef}>
        <Toolbar.Wrapper isVertical>
          <PopoverMenu.Item icon="Trash" close={false} label="Delete" onClick={onDelete} />
        </Toolbar.Wrapper>
      </div>
    </BaseBubbleMenu>
  )
})

ContentItemMenu.displayName = 'ContentItemMenu'
