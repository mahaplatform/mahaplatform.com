import { createSelector } from 'reselect'
import _ from 'lodash'

const columns = (state, props) => props.columns

const hidden = (state, props) => state.hidden

export const invisible = createSelector(
  columns,
  (columns) => columns.filter(column => {
    return column.visible === false
  }).map(column => column.key))

export const display = createSelector(
  columns,
  hidden,
  (columns, hidden) => columns.map(column => ({
    ...column,
    visible: column.primary === true || !_.includes(hidden, column.key)
  })))
