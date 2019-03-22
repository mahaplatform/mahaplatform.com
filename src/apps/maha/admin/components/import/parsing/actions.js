export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const parse = (id, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body,
  endpoint: `/api/admin/imports/${id}/parse`,
  request: 'PARSE_REQUEST',
  success: 'PARSE_SUCCESS',
  failure: 'PARSE_FAILURE'
})

export const success = (imp) => ({
  type: 'SUCCESS',
  import: imp
})

export const fail = (error) => ({
  type: 'FAIL',
  error
})

export const updateProgress = (progress) => ({
  type: 'UPDATE_PROGRESS',
  progress
})
