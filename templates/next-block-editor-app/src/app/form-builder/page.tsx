'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Surface } from '@/components/ui/Surface'
import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import { useState, useEffect, useCallback } from 'react'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { Node } from '@tiptap/core'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'
import { FooterRowTemplates } from '@/components/FooterRowTemplates/FooterRowTemplates'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { FormBuilderHeader } from './components/FormBuilderHeader'

// Create a HeaderMenuBar component
const HeaderMenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-neutral-200 p-2 mb-2">
      <Toolbar.Wrapper>
        {/* Headings */}
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          tooltip="Heading 1"
        >
          <Icon name="Heading1" />
        </Toolbar.Button>
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          tooltip="Heading 2"
        >
          <Icon name="Heading2" />
        </Toolbar.Button>

        <Toolbar.Divider />

        {/* Text Formatting */}
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          tooltip="Bold"
        >
          <Icon name="Bold" />
        </Toolbar.Button>
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          tooltip="Italic"
        >
          <Icon name="Italic" />
        </Toolbar.Button>
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          tooltip="Underline"
        >
          <Icon name="Underline" />
        </Toolbar.Button>

        <Toolbar.Divider />

        {/* Alignment */}
        <Toolbar.Button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          tooltip="Align Left"
        >
          <Icon name="AlignLeft" />
        </Toolbar.Button>
        <Toolbar.Button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          tooltip="Align Center"
        >
          <Icon name="AlignCenter" />
        </Toolbar.Button>
        <Toolbar.Button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          tooltip="Align Right"
        >
          <Icon name="AlignRight" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </div>
  )
}

// Create a ColumnEditor component for independent column editing
const ColumnEditor = ({ content }: { content: string }) => {
  const columnEditor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content,
    editable: true,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[50px]',
      },
    },
  })

  return <EditorContent editor={columnEditor} />
}

// Update FooterColumn to use ColumnEditor
const FooterColumn = Node.create({
  name: 'footerColumn',
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [{ tag: 'div[data-type="footer-column"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-type': 'footer-column',
        class:
          'min-h-[100px] p-4 rounded border border-dashed border-gray-200 hover:border-gray-300 focus-within:border-blue-500 transition-colors',
      },
      0,
    ]
  },
})

// Update FooterRow to handle draggable functionality
const FooterRow = Node.create({
  name: 'footerRow',
  group: 'block',
  draggable: true,
  content: 'footerColumn+',

  parseHTML() {
    return [{ tag: 'div[data-type="footer-row"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-type': 'footer-row',
        class: 'relative flex gap-4 p-4 border border-transparent hover:border-gray-200 rounded group',
      },
      [
        'div',
        {
          class: 'absolute -left-1 inset-y-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity',
          'data-drag-handle': '',
        },
      ],
      [
        'div',
        {
          class: 'flex-1 grid gap-4',
          style: `grid-template-columns: repeat(${HTMLAttributes.columns || 2}, minmax(0, 1fr))`,
        },
        0,
      ],
    ]
  },

  addAttributes() {
    return {
      columns: {
        default: 2,
      },
    }
  },
})

// Create a FooterMenuBar component
const FooterMenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  function insertFourColumnImageRow() {
    editor
      .chain()
      .focus()
      .insertContent(
        `
      <div data-type="footer-row">
        <div data-type="footer-column"><img src="/placeholder.jpg" alt="Logo 1" /></div>
        <div data-type="footer-column"><img src="/placeholder.jpg" alt="Logo 2" /></div>
        <div data-type="footer-column"><img src="/placeholder.jpg" alt="Logo 3" /></div>
        <div data-type="footer-column"><img src="/placeholder.jpg" alt="Logo 4" /></div>
      </div>
    `,
      )
      .run()
  }

  function insertSingleColumnWithImageRow() {
    editor
      .chain()
      .focus()
      .insertContent(
        `
      <div data-type="footer-row">
        <div data-type="footer-column">
          <img src="/placeholder.jpg" alt="Logo" />
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </div>
    `,
      )
      .run()
  }

  function insertTwoColumnTextRow() {
    editor
      .chain()
      .focus()
      .insertContent(
        `
      <div data-type="footer-row">
        <div data-type="footer-column"><p>Left column text</p></div>
        <div data-type="footer-column"><p>Right column text</p></div>
      </div>
    `,
      )
      .run()
  }

  function insertFourColumnLinksRow() {
    editor
      .chain()
      .focus()
      .insertContent(
        `
      <div data-type="footer-row">
        <div data-type="footer-column"><a href="#">Link 1</a></div>
        <div data-type="footer-column"><a href="#">Link 2</a></div>
        <div data-type="footer-column"><a href="#">Link 3</a></div>
        <div data-type="footer-column"><a href="#">Link 4</a></div>
      </div>
    `,
      )
      .run()
  }

  return (
    <div className="border-b border-neutral-200 p-2 mb-2">
      <Toolbar.Wrapper>
        <Toolbar.Button onClick={insertFourColumnImageRow} tooltip="4-Column Image Row">
          <Icon name="LayoutGrid" />
        </Toolbar.Button>
        <Toolbar.Button onClick={insertSingleColumnWithImageRow} tooltip="Single Column with Image">
          <Icon name="LayoutTemplate" />
        </Toolbar.Button>
        <Toolbar.Button onClick={insertTwoColumnTextRow} tooltip="2-Column Text Row">
          <Icon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button onClick={insertFourColumnLinksRow} tooltip="4-Column Links Row">
          <Icon name="Link" />
        </Toolbar.Button>

        <Toolbar.Divider />

        {/* Keep existing text formatting options */}
        <Toolbar.Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          tooltip="Bold"
        >
          <Icon name="Bold" />
        </Toolbar.Button>
        {/* ... other text formatting buttons ... */}
      </Toolbar.Wrapper>
    </div>
  )
}

// Move helper functions to the top
const insertFourColumnImageRow = (editor: any) => {
  editor
    .chain()
    .focus()
    .insertContent({
      type: 'footerRow',
      attrs: { columns: 4 },
      content: Array(4).fill({
        type: 'footerColumn',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Drop image here' }],
          },
        ],
      }),
    })
    .run()
}

const insertSingleColumnWithImageRow = (editor: any) => {
  editor
    .chain()
    .focus()
    .insertContent({
      type: 'footerRow',
      attrs: { columns: 1 },
      content: [
        {
          type: 'footerColumn',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Drop image here' }],
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Add text here' }],
            },
          ],
        },
      ],
    })
    .run()
}

const insertTwoColumnTextRow = (editor: any) => {
  editor
    .chain()
    .focus()
    .insertContent({
      type: 'footerRow',
      attrs: { columns: 2 },
      content: Array(2).fill({
        type: 'footerColumn',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Add text here' }],
          },
        ],
      }),
    })
    .run()
}

const insertFourColumnLinksRow = (editor: any) => {
  editor
    .chain()
    .focus()
    .insertContent({
      type: 'footerRow',
      attrs: { columns: 4 },
      content: Array(4).fill({
        type: 'footerColumn',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'link', attrs: { href: '#' } }],
                text: 'Add link here',
              },
            ],
          },
        ],
      }),
    })
    .run()
}

// Update FooterEditor component to handle drag and drop between rows
const FooterEditor = ({ editor }: { editor: any }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FOOTER_TEMPLATE',
    drop: (item: { type: string }, monitor) => {
      if (!editor?.isEditable) return

      try {
        const dropPosition = monitor.getClientOffset()
        const editorRect = document.querySelector('[data-type="footer-editor"]')?.getBoundingClientRect()

        if (dropPosition && editorRect) {
          const rows = document.querySelectorAll('[data-type="footer-row"]')
          let insertIndex = rows.length

          // Find insert position based on drop position
          rows.forEach((row, index) => {
            const rect = row.getBoundingClientRect()
            if (dropPosition.y < rect.top + rect.height / 2) {
              insertIndex = index
              return false
            }
          })

          // Insert at calculated position
          editor.commands.insertContentAt(insertIndex, {
            type: 'footerRow',
            attrs: { columns: 2 },
            content: [
              {
                type: 'footerColumn',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Edit this column' }] }],
              },
              {
                type: 'footerColumn',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Edit this column' }] }],
              },
            ],
          })
        }
      } catch (error) {
        console.error('Error inserting template:', error)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })

  if (!editor) return null

  return (
    <div ref={drop} data-type="footer-editor" className={`min-h-[200px] ${isOver ? 'bg-blue-50' : ''}`}>
      <EditorContent editor={editor} />
    </div>
  )
}

export default function FormBuilder() {
  const [selectedAmount, setSelectedAmount] = useState('25')
  const [donationType, setDonationType] = useState('oneTime')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setIsDarkMode(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => setIsDarkMode(isDark => !isDark), [])

  const headerEditor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          class: 'font-bold',
          heading1: {
            class: 'text-5xl font-bold mb-4',
          },
          heading2: {
            class: 'text-2xl font-semibold mb-3',
          },
        },
      }),
      Bold,
      Italic,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content:
      '<h1 class="text-3xl font-bold mb-4 text-red-600">HELP FIND A CURE</h1><h2 class="text-2xl font-semibold mb-3 text-navy-800">Donate to National Glaucoma Research</h2><p>Your generosity helps us fund groundbreaking research and provide vital information to the public. Please give today.</p>',
    editable: true,
    immediatelyRender: false,
  })

  const footerEditor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
      }),
      TextAlign.configure({
        types: ['paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      FooterRow,
      FooterColumn,
    ],
    content: '',
    editable: true,
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved) {
          return false
        }
        return true
      },
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  })

  // Add this input class definition
  const inputClassName = `w-full px-4 py-2 border rounded-md
    bg-white dark:bg-black 
    text-black dark:text-white 
    border-gray-300 dark:border-white/20
    placeholder:text-gray-500 dark:placeholder:text-white/60
    focus:border-blue-500 dark:focus:border-blue-400
    transition-colors`

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <FormBuilderHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="max-w-4xl mx-auto p-8">
          <Surface className="mb-8">
            <HeaderMenuBar editor={headerEditor} />
            <div className="p-4">
              <EditorContent editor={headerEditor} />
            </div>
          </Surface>

          {/* Form Fields */}
          <Surface className="mb-8 p-4">
            <form className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Gift Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Please make my gift</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className={`px-4 py-2 border rounded-md transition-colors
                          ${
                            donationType === 'oneTime'
                              ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-black dark:text-white'
                              : 'border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        onClick={() => setDonationType('oneTime')}
                      >
                        One Time
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border rounded-md transition-colors
                          ${
                            donationType === 'monthly'
                              ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-black dark:text-white'
                              : 'border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        onClick={() => setDonationType('monthly')}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">I would like to donate</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['25', '50', '100', '250', '5000'].map(amount => (
                        <button
                          key={amount}
                          type="button"
                          className={`px-4 py-2 border rounded-md transition-colors
                            ${
                              selectedAmount === amount
                                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-black dark:text-white'
                                : 'border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                            }`}
                          onClick={() => setSelectedAmount(amount)}
                        >
                          ${amount}
                        </button>
                      ))}
                      <button
                        type="button"
                        className={`px-4 py-2 border rounded-md transition-colors
                          ${
                            selectedAmount === 'custom'
                              ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-black dark:text-white'
                              : 'border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        onClick={() => setSelectedAmount('custom')}
                      >
                        My Best Gift
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">This is an honor/memorial gift</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">My Information</h2>
                <div className="space-y-4">
                  <input type="email" placeholder="Email Address" className={inputClassName} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className={inputClassName} />
                    <input type="text" placeholder="Last Name" className={inputClassName} />
                  </div>
                  <input type="text" placeholder="Street Address" className={inputClassName} />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className={inputClassName} />
                    <select className={inputClassName} defaultValue="">
                      <option value="" disabled>
                        State
                      </option>
                      <option value="MD">Maryland</option>
                    </select>
                    <input type="text" placeholder="Zip Code" className={inputClassName} />
                  </div>
                  <select className={inputClassName} defaultValue="US">
                    <option value="US">United States</option>
                  </select>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Payment Info</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className={`${inputClassName} flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900`}
                    >
                      <Icon name="Chrome" />
                      Google Pay
                    </button>
                    <button
                      type="button"
                      className={`${inputClassName} flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                      <Icon name="CreditCard" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      className={`${inputClassName} flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900`}
                    >
                      <Icon name="Coins" />
                      PayPal
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">
                        I&apos;d like to cover the processing fee of $1.58 so my donation funds even more
                        ground-breaking research.
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">My billing information is the same as my mailing information</span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </Surface>

          <Surface className="flex">
            <FooterRowTemplates />
            <div className="flex-1">
              <FooterEditor editor={footerEditor} />
            </div>
          </Surface>
        </div>
      </div>
    </DndProvider>
  )
}
