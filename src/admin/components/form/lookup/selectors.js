import { createSelector } from 'reselect'
import _ from 'lodash'

const given = (state, props) => props.options

export const options = createSelector(
  given,
  (options) => options ? options.map(option => {
    return (_.isString(option)) ? { value: option, text: option } : option
  }) : null
)
