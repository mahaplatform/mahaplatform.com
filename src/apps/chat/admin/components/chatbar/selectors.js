import { createSelector } from 'reselect'
import _ from 'lodash'

const channels = (state, props) => props.channels

const selected = (state, props) => state.selected

export const channel = createSelector(
  channels,
  selected,
  (channels, id) => _.find(channels, { id }))
