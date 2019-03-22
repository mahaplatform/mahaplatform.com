export const init = (imp) => ({
  type: 'INIT',
  import: imp
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

export const updateName = (name) => ({
  type: 'UPDATE_NAME',
  name
})

export const updateStrategy = (strategy) => ({
  type: 'UPDATE_STRATEGY',
  strategy
})
