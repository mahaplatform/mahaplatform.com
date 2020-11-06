import { createSelector } from 'reselect'
import _ from 'lodash'

const provided = (state, props) => props.options

const text = (state, props) => props.text

const q = (state, props) => state.q

export const options = createSelector(
  provided,
  text,
  q,
  (options, text, q) => options ? options.filter(option => {
    if(q === null || q.length === 0 || !text) return true
    return _.get(option, text).toLowerCase().search(q.toLowerCase()) >= 0
  }) : null
)
