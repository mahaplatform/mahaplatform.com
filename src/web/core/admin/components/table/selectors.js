import { createSelector } from 'reselect'
import _ from 'lodash'

const columns = (state, props) => props.columns

const hidden = (state, props) => state.hidden

export const display = createSelector(
  columns,
  hidden,
  (columns, hidden) => columns.map(column => {
    console.log(hidden, column.key)
    return {
      ...column,
      visible: column.primary === true || (!_.includes(hidden, column.key) && column.visible !== false)
    }
  }))
