import { createSelector } from 'reselect'

const filter = (state, props) => {
  if(!props.filter) return { $and: [] }
  if(!props.filter.$and) return { $and: [ props.filter ]}
  return props.filter
}

const selectMode = (state, props) => state.selectMode

const selectValue = (state, props) => props.selectValue || 'id'

const selectedValues = (state, props) => state.selectedValues

const total = (state, props) => state.total

export const selected = createSelector(
  filter,
  selectMode,
  selectValue,
  selectedValues,
  total,
  (filter, mode, value, values, total) => ({
    filter: {
      ...filter,
      $and: [
        ...filter.$and,
        { [value]: {
          [mode]: values
        }}
      ]
    },
    values,
    mode,
    total: mode === '$in' ? values.length : total - values.length
  })
)
