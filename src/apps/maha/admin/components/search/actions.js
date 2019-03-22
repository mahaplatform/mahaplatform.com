export const choose = (model, index) => ({
  type: 'CHOOSE',
  model,
  index
})

export const type = (q) => ({
  type: 'TYPE',
  q
})

export const fetchResults = (q) => ({
  type: 'API_REQUEST',
  method: 'GET',
  query: { q },
  endpoint: '/api/admin/search',
  request: 'FETCH_RESULTS_REQUEST',
  success: 'FETCH_RESULTS_SUCCESS',
  failure: 'FETCH_RESULTS_FAILURE'
})

export const save = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body,
  endpoint: '/api/admin/searches',
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const clearRecent = (onSuccess) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: '/api/admin/searches/clear',
  request: 'CLEAR_RECENT_REQUEST',
  success: 'CLEAR_RECENT_SUCCESS',
  failure: 'CLEAR_RECENT_FAILURE',
  onSuccess
})
