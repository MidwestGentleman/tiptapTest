import { Node } from '@tiptap/core'

export enum FooterColumnLayout {
  TwoColumn = 'two-column',
  ThreeColumn = 'three-column',
  FourColumn = 'four-column',
  FiveColumn = 'five-column',
  SixColumn = 'six-column',
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    footerColumns: {
      setFooterColumns: (layout: FooterColumnLayout) => ReturnType
    }
  }
}

export const FooterColumns = Node.create({
  name: 'footerColumns',
  
  group: 'block',
  
  content: 'footerColumn+',
  
  defining: true,
  
  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: FooterColumnLayout.ThreeColumn,
      },
    }
  },

  addCommands() {
    return {
      setFooterColumns:
        (layout: FooterColumnLayout) =>
        ({ commands }) => {
          const columnCount = {
            [FooterColumnLayout.TwoColumn]: 2,
            [FooterColumnLayout.ThreeColumn]: 3,
            [FooterColumnLayout.FourColumn]: 4,
            [FooterColumnLayout.FiveColumn]: 5,
            [FooterColumnLayout.SixColumn]: 6,
          }

          const columns = Array(columnCount[layout])
            .fill(null)
            .map(() => `<div data-type="footerColumn"><p></p></div>`)
            .join('')

          return commands.insertContent(
            `<div data-type="footerColumns" data-layout="${layout}">${columns}</div>`
          )
        },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'footerColumns', class: `layout-${HTMLAttributes.layout}` }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="footerColumns"]',
      },
    ]
  },
}) 