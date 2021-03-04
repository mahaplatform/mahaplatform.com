import { createSelector } from 'reselect'
import _ from 'lodash'

const columns = (state, props) => props.columns

const hidden = (state, props) => state.hidden

const selectable = (state, props) => props.selectable

const width = (state, props) => state.width

export const defaults = createSelector(
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

export const visible = createSelector(
  display,
  (columns) => columns.filter(column => {
    return column.visible !== false
  })
)

export const widths = createSelector(
  selectable,
  visible,
  width,
  (selectable, columns, width) => {
    const fixed = columns.filter(column => {
      return column.width !== undefined
    })
    const used = fixed.reduce((used, column) => {
      return used + (column.width || 0)
    }, 0)
    const available = width - used - 40 - 8 - (selectable ? 40 : 0)
    const widths = columns.map(column => {
      return column.width || available / (columns.length - fixed.length)
    })
    return columns.map((column, index) => {
      const grow = column.width === undefined ? 1 : 0
      return {
        flex: `${grow} 1 ${widths[index]}px`
      }
    })
  }
)
