export const finalizeTrips = (id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  body: { id },
  endpoint: `/api/admin/expenses/items/import/finalize`,
  request: 'IMPORT_FINALIZE_REQUEST',
  success: 'IMPORT_FINALIZE_SUCCESS',
  failure: 'IMPORT_FINALIZE_FAILURE'
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
