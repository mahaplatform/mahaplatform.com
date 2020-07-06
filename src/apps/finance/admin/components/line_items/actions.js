export const addLineItem = (line_item) => ({
  type: 'ADD_LINE_ITEM',
  line_item
})

export const removeLineItem = (index) => ({
  type: 'REMOVE_LINE_ITEM',
  index
})

export const set = (details) => ({
  type: 'SET',
  details
})
