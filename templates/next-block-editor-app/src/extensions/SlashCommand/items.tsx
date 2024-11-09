import { Editor, Range } from '@tiptap/core'
import { Icon } from '@/components/ui/Icon'
import { FooterColumnLayout } from '../FooterColumns'

interface CommandProps {
  editor: Editor
  range: Range
}

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: <Icon name="Text" />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large', 'h1'],
      icon: <Icon name="Heading1" />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      },
    },
    // ... other existing items ...
    {
      title: 'Footer',
      description: 'Add a footer section with columns',
      searchTerms: ['footer', 'columns', 'layout'],
      icon: <Icon name="Columns3" />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setFooterColumns(FooterColumnLayout.ThreeColumn)
          .run()
      },
    },
  ].filter(item => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms && item.searchTerms.some(term => term.includes(search)))
      )
    }
    return true
  })
} 