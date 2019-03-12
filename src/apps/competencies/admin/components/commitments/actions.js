export const save = (plan_id, ids) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/competencies/plans/${plan_id}/goals`,
  body: { ids },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const set = (key, value) => ({
  type: 'SET',
  key,
  value
})

export const toggle = (id) => ({
  type: 'TOGGLE',
  id
})

export const toggleReview = () => ({
  type: 'TOGGLE_REVIEW'
})
