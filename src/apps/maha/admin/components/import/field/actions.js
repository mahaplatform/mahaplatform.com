export const setConfig = (config) => ({
  type: 'SET_CONFIG',
  config
})

export const updateConfig = (config) => ({
  type: 'UPDATE_CONFIG',
  config
})

export const getFields = (table) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/fields/${table}`,
  request: 'PREVIEW_FIELDS_REQUEST',
  success: 'PREVIEW_FIELDS_SUCCESS',
  failure: 'PREVIEW_FIELDS_FAILURE'
})

export const getRelationColumns = (table) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/fields/${table}`,
  request: 'PREVIEW_RELATIONCOLUMNS_REQUEST',
  success: 'PREVIEW_RELATIONCOLUMN_SUCCESS',
  failure: 'PREVIEW_RELATIONCOLUMNS_FAILURE'
})
