import { createSelector } from 'reselect'

const responsibility_types = (state, props) => state.responsibility_types

const premerged = (state, props) => state.responsibilities

export const responsibilities = createSelector(
  responsibility_types,
  premerged,
  (responsibility_types, responsibilities) => responsibilities.map(responsibility => ({
    id: responsibility.id,
    responsibility_type: responsibility_types.find(responsibility_type => {
      return responsibility_type.id === responsibility.responsibility_type_id
    }),
    weight: responsibility.weight,
    rating: responsibility.rating,
    comments: responsibility.comments
  }))
)
