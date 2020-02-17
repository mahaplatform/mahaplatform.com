import { createSelector } from 'reselect'
import { toFilter, toDisplay} from '../utils'

const items = (state, props) => state.items

export const criteria = createSelector(
  items,
  (items) => {
    return toFilter(items, null)
  }
)

export const display = createSelector(
  items,
  (items) => toDisplay(items, null)
)
