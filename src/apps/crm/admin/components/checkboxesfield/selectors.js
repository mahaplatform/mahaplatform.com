import { createSelector } from 'reselect'

const items = (state, props) => state.items || []

const selected = (state, props) => state.selected || []

export const sections = createSelector(
  items,
  selected,
  (items, selected) => items.reduce((sections, item, index) => {
    return {
      ...sections,
      [item.program.id]: {
        ...item.program,
        items: [
          ...sections[item.program.id] ? sections[item.program.id].items : [],
          { id: item.id, title: item.title }
        ]
      }
    }
  }, {})
)
