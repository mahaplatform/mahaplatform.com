import { createSelector } from 'reselect'
import _ from 'lodash'

const root  = (state, props) => state.maha.reactions.reactions

const user_id = (state, props) => state.maha.admin.user.id

const table = (state, props) => props.table

const id = (state, props) => props.id

const initial_reactions = (state, props) => props.reactions

const unsorted = createSelector(
  root,
  table,
  id,
  initial_reactions,
  (root, table, id, initial) => _.get(root, `${table}.${id}`) || initial
)

export const total = createSelector(
  unsorted,
  (unsorted) => unsorted.length
)

export const reactions = createSelector(
  unsorted,
  (unsorted) => unsorted.reduce((reactions, reaction) => ({
    ...reactions,
    [reaction.type]: [
      ...reactions[reaction.type] || [],
      {
        id: reaction.id,
        full_name: reaction.full_name,
        initials: reaction.initials,
        photo: reaction.photo
      }
    ]
  }), {})
)

export const user_reactions = createSelector(
  unsorted,
  user_id,
  (unsorted, user_id) => unsorted.filter(reaction => {
    return reaction.id === user_id
  }).map(reaction => reaction.type)
)
