export const fetch = (program_id, id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/crm/programs/${program_id}/templates/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const save = (program_id, id, config) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/crm/programs/${program_id}/templates/${id}`,
  body: { config },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const update = (config) => ({
  type: 'UPDATE',
  config
})
