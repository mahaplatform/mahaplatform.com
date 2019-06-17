import { createSelector } from 'reselect'
import _ from 'lodash'

const stars = (state, props) => state.maha.stars.stars

const table = (state, props) => props.table

const id = (state, props) => props.id

const initial_is_starred = (state, props) => props.is_starred

export const is_starred = createSelector(
  stars,
  table,
  id,
  initial_is_starred,
  (stars, table, id, is_starred) => {

    const computed = _.get(stars, `${table}.${id}`)

    return computed !== undefined ? computed : is_starred

  })
