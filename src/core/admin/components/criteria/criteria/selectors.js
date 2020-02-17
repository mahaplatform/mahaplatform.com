import { createSelector } from 'reselect'
import { toCriteria, toDisplay} from '../utils'

const items = (state, props) => state.items

export const criteria = createSelector(
  items,
  (items) => {
    return toCriteria(items, null)
  }
)

export const display = createSelector(
  items,
  (items) => toDisplay(items, null)
)
