'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Surface } from '@/components/ui/Surface'
import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import { useState, useEffect } from 'react'

// Create a HeaderMenuBar component
const HeaderMenuBar = ({ editor }: { editor: any }) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!editor) return

    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    editor.on('focus', onFocus)
    editor.on('blur', onBlur)

    return () => {
      editor.off('focus', onFocus)
      editor.off('blur', onBlur)
    }
  }, [editor])

  if (!editor || !isFocused) {
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

export default function FormBuilder() {
  const [selectedAmount, setSelectedAmount] = useState('25')
  const [donationType, setDonationType] = useState('oneTime')
  
  const headerEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        },
        bold: true,
        italic: true,
      }),
      Underline.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: '<h1 class="text-red-600">HELP FIND A CURE</h1><h2 class="text-navy-800">Donate to National Glaucoma Research</h2><p>Your generosity helps us fund groundbreaking research and provide vital information to the public. Please give today.</p>',
    editable: true,
  })

  const footerEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        },
        bold: true,
        italic: true,
      }),
      Underline.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: '<p>BrightFocus Foundation is tax-exempt nonprofit organization under section 501(c)(3) of the Internal Revenue Code of the United States.</p>',
    editable: true,
  })

  return (
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
            <h2 className="text-lg font-semibold mb-4">Gift Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Please make my gift</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={`px-4 py-2 border rounded-md ${donationType === 'oneTime' ? 'bg-blue-50 border-blue-500' : ''}`}
                    onClick={() => setDonationType('oneTime')}
                  >
                    One Time
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 border rounded-md ${donationType === 'monthly' ? 'bg-blue-50 border-blue-500' : ''}`}
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
                      className={`px-4 py-2 border rounded-md ${selectedAmount === amount ? 'bg-blue-50 border-blue-500' : ''}`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`px-4 py-2 border rounded-md ${selectedAmount === 'custom' ? 'bg-blue-50 border-blue-500' : ''}`}
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
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-2 border rounded-md"
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-2 border rounded-md"
                />
                <select
                  className="px-4 py-2 border rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>State</option>
                  <option value="MD">Maryland</option>
                  {/* Add other states */}
                </select>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="px-4 py-2 border rounded-md"
                />
              </div>
              <select
                className="w-full px-4 py-2 border rounded-md"
                defaultValue="US"
              >
                <option value="US">United States</option>
                {/* Add other countries */}
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Info</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button type="button" className="px-4 py-2 border rounded-md flex items-center gap-2">
                  <Icon name="Chrome" />
                  Pay
                </button>
                <button type="button" className="px-4 py-2 border rounded-md">Credit Card</button>
                <button type="button" className="px-4 py-2 border rounded-md flex items-center gap-2">
                  <Icon name="CreditCard" />
                  PayPal
                </button>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">I'd like to cover the processing fee of $1.58 so my donation funds even more ground-breaking research.</span>
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

      <Surface className="p-4">
        <HeaderMenuBar editor={footerEditor} />
        <div className="p-4">
          <EditorContent editor={footerEditor} />
        </div>
      </Surface>
    </div>
  )
} 