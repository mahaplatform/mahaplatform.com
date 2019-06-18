import { createSelector } from 'reselect'
import _ from 'lodash'

const items = (state, props) => props.items || []

const rights = (state, props) => state.maha ? state.maha.admin.rights : []

export const allowed = createSelector(
  items,
  rights,
  (items, rights) => items.filter(item => {
    if(item.show !== undefined && !item.show) return false
    if(item.rights !== undefined && !_.includes(rights, item.rights[0])) return false
    return true
  })
)
