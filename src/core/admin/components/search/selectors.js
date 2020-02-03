import { createSelector } from 'reselect'

const provided = (state, props) => props.options

const q = (state, props) => state.q

export const options = createSelector(
  provided,
  q,
  (options, q) => options ? options.filter(option => {
    return q === null || q.length === 0 || option.text.search(q) >= 0
  }) : null
)
