export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const omitErrors = (id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/admin/imports/${id}/omiterrors`,
  request: 'PARSE_OMITERRORS_REQUEST',
  success: 'PARSE_OMITERRORS_SUCCESS',
  failure: 'PARSE_OMITERRORS_FAILURE'
})

export const updateImport = (id, body) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  body,
  endpoint: `/api/admin/imports/${id}`,
  request: 'UPDATE_IMPORT_REQUEST',
  success: 'UPDATE_IMPORT_SUCCESS',
  failure: 'UPDATE_IMPORT_FAILURE'
})
