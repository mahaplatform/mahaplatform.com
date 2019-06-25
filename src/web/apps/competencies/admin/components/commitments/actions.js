export const save = (plan_id, commitments) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/competencies/plans/${plan_id}/commitments`,
  body: { commitments },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
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

export const add = (description) => ({
  type: 'ADD',
  description
})

export const toggleReview = () => ({
  type: 'TOGGLE_REVIEW'
})
