import { createSelector } from 'reselect'

const items = (state, props) => state.items || []

const selected = (state, props) => state.selected || []

export const sections = createSelector(
  items,
  selected,
  (items, selected) => {
    const sections = items.reduce((sections, item, index) => ({
      ...sections,
      [item.program.id]: {
        ...item.program,
        items: [
          ...sections[item.program.id] ? sections[item.program.id].items : [],
          item
        ]
      }
    }), {})
    return Object.values(sections).sort((a,b) => {
      return a.title > b.title ? 1 : -1
    })
  }
)
