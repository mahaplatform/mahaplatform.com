export const save = (plan_id, commitments) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/learning/plans/${plan_id}/commitments`,
  body: { commitments },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const add = (commitment) => ({
  type: 'ADD',
  commitment
})

export const set = (key, value) => ({
  type: 'SET',
  key,
  value
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const toggle = (resource) => ({
  type: 'TOGGLE',
  resource
})

export const toggleReview = () => ({
  type: 'TOGGLE_REVIEW'
})

export const update = (index, description) => ({
  type: 'UPDATE',
  index,
  description
})
