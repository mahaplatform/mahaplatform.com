export const lookup = (areacode, latitude, longitude) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/crm/numbers/lookup',
  query: { areacode, latitude, longitude },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const save = (program_id, number, locality, region) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/admin/crm/programs/${program_id}/numbers`,
  body: { number, locality, region },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const setFilter = (key, value) => ({
  type: 'SET_FILTER',
  key,
  value
})
