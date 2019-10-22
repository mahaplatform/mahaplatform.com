import { createSelector } from 'reselect'
import _ from 'lodash'

const items = (state, props) => state.items || []

const selected = (state, props) => state.selected || []

export const sections = createSelector(
  items,
  selected,
  (items, selected) => items.reduce((sections, item, index) => {
    return {
      ...sections,
      [item.program.id]: {
        title: item.program.title,
        items: [
          ...sections[item.program.id] ? sections[item.program.id].items : [],
          { id: item.id, title: item.title, checked: _.includes(selected, item.id) }
        ]
      }
    }
  }, {})
)
