'use client'

import { useDrag } from 'react-dnd'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'

type TemplateType = 'four-column-images' | 'single-column-image' | 'two-column-text' | 'four-column-links'

interface TemplateItemProps {
  type: TemplateType
  icon: keyof typeof import('lucide-react').icons
  label: string
}

const TemplateItem = ({ type, icon, label }: TemplateItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FOOTER_TEMPLATE',
    item: { type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-2 rounded cursor-move hover:bg-gray-100 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon name={icon} className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export const FooterRowTemplates = () => {
  const templates: TemplateItemProps[] = [
    {
      type: 'four-column-images',
      icon: 'LayoutGrid',
      label: '4-Column Images',
    },
    {
      type: 'single-column-image',
      icon: 'LayoutTemplate',
      label: 'Single Column + Image',
    },
    {
      type: 'two-column-text',
      icon: 'Columns2',
      label: '2-Column Text',
    },
    {
      type: 'four-column-links',
      icon: 'Link',
      label: '4-Column Links',
    },
  ]

  return (
    <Surface className="w-64 border-r border-gray-200 p-4">
      <h3 className="text-sm font-medium mb-4">Footer Templates</h3>
      <div className="space-y-2">
        {templates.map((template) => (
          <TemplateItem
            key={template.type}
            type={template.type}
            icon={template.icon}
            label={template.label}
          />
        ))}
      </div>
    </Surface>
  )
} 