import { createSelector } from 'reselect'

const parent_type = (state, props) => props.parent_type

const parent_id = (state, props) => props.parent_id

export const endpoint = createSelector(
  parent_type,
  parent_id,
  (parent_type, parent_id) => {
    if(parent_id) return `/api/admin/${parent_type}/${parent_id}/fields`
    return `/api/admin/${parent_type}/fields`
  })
