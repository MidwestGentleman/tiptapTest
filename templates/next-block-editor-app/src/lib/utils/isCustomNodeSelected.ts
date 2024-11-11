import { Editor } from '@tiptap/core'
import { Selection } from '@/extensions'

export const isCustomNodeSelected = (editor: Editor) => {
  const { state } = editor
  const { from, to } = state.selection

  let isSelected = false

  state.doc.nodesBetween(from, to, node => {
    if (
      node.type.name === 'columns' ||
      node.type.name === 'footerColumns' ||
      node.type.name === 'imageBlock' ||
      node.type.name === 'table'
    ) {
      isSelected = true
      return false
    }
  })

  return isSelected
}

export const getSelectedNode = (editor: Editor) => {
  const { state } = editor
  const { from, to } = state.selection

  let selectedNode = null

  state.doc.nodesBetween(from, to, node => {
    if (
      node.type.name === 'columns' ||
      node.type.name === 'footerColumns' ||
      node.type.name === 'imageBlock' ||
      node.type.name === 'table'
    ) {
      selectedNode = node
      return false
    }
  })

  return selectedNode
}
