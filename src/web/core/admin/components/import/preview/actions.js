export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const previewData = (id, delimiter, headers) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body: { delimiter, headers },
  endpoint: `/api/admin/imports/${id}/preview`,
  request: 'PREVIEW_DATA_REQUEST',
  success: 'PREVIEW_DATA_SUCCESS',
  failure: 'PREVIEW_DATA_FAILURE'
})

export const previous = () => ({
  type: 'PREVIOUS'
})

export const next = () => ({
  type: 'NEXT'
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

export const getFields = (table) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/fields/${table}`,
  request: 'PREVIEW_FIELDS_REQUEST',
  success: 'PREVIEW_FIELDS_SUCCESS',
  failure: 'PREVIEW_FIELDS_FAILURE'
})

export const getTables = (table) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/tables/${table}`,
  request: 'PREVIEW_TABLES_REQUEST',
  success: 'PREVIEW_TABLES_SUCCESS',
  failure: 'PREVIEW_TABLES_FAILURE'
})
