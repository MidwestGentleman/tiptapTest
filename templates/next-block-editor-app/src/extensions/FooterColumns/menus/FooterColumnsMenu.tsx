import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { v4 as uuid } from 'uuid'

import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'
import { MenuProps } from '@/components/menus/types'
import { FooterColumnLayout } from '../FooterColumns'

export const FooterColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isActive('footerColumns')
  }, [editor])

  const addTwoColumns = useCallback(() => {
    editor.chain().focus().setFooterColumns(FooterColumnLayout.TwoColumn).run()
  }, [editor])

  const addThreeColumns = useCallback(() => {
    editor.chain().focus().setFooterColumns(FooterColumnLayout.ThreeColumn).run()
  }, [editor])

  const addFourColumns = useCallback(() => {
    editor.chain().focus().setFooterColumns(FooterColumnLayout.FourColumn).run()
  }, [editor])

  const addFiveColumns = useCallback(() => {
    editor.chain().focus().setFooterColumns(FooterColumnLayout.FiveColumn).run()
  }, [editor])

  const addSixColumns = useCallback(() => {
    editor.chain().focus().setFooterColumns(FooterColumnLayout.SixColumn).run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`footerColumnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        appendTo: () => appendTo?.current,
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button tooltip="Two columns" onClick={addTwoColumns}>
          <Icon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Three columns" onClick={addThreeColumns}>
          <Icon name="Columns3" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Four columns" onClick={addFourColumns}>
          <Icon name="Grid2x2" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Five columns" onClick={addFiveColumns}>
          <Icon name="Grid" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Six columns" onClick={addSixColumns}>
          <Icon name="Grid3x2" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
} 