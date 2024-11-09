import { Node, mergeAttributes } from '@tiptap/core'

export const FooterColumn = Node.create({
  name: 'footerColumn',

  content: 'block+',

  isolating: true,

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'footerColumn' }), 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="footerColumn"]',
      },
    ]
  },
}) 