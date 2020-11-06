export const createImport = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body,
  endpoint: '/api/admin/imports',
  request: 'CREATE_IMPORT_REQUEST',
  success: 'CREATE_IMPORT_SUCCESS',
  failure: 'CREATE_IMPORT_FAILURE'
})
