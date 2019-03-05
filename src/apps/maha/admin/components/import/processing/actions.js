export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const process = (id, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body,
  endpoint: `/api/admin/imports/${id}/process`,
  request: 'PROCESS_REQUEST',
  success: 'PROCESS_SUCCESS',
  failure: 'PROCESS_FAILURE'
})

export const success = (imp) => ({
  type: 'SUCCESS',
  import: imp
})

export const fail = (error) => ({
  type: 'FAIL',
  error
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

export const updateProgress = (imp) => ({
  type: 'UPDATE_PROGRESS',
  import: imp
})
