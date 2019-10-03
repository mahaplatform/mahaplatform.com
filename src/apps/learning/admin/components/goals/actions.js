export const save = (plan_id, goals) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/learning/plans/${plan_id}/goals`,
  body: { goals },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const add = (goal) => ({
  type: 'ADD',
  goal
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (key, value) => ({
  type: 'SET',
  key,
  value
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
