export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const updateMapping = (mappingItem, index) => ({
  type: 'UPDATE_MAPPING',
  index,
  mappingItem
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
