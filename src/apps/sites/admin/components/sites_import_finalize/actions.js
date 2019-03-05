export const finalizeSites = (import_id, site_id, type_id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  body: { import_id, type_id },
  endpoint: `/api/admin/sites/sites/${site_id}/types/${type_id}/items/finalize`,
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
