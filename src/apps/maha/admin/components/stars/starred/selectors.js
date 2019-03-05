import { createSelector } from 'reselect'

const stars = (state, props) => state.maha.stars.stars[props.table] || {}

const starred = (state, props) => props.is_starred

const id = (state, props) => props.id

export const is_starred = createSelector(
  stars,
  starred,
  id,
  (stars, starred, id) => stars[id] !== undefined ? stars[id] : starred)
