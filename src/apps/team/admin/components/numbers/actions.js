export const lookup = (areacode) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/team/numbers/lookup',
  query: { areacode },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const save = (number, locality, region) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/team/numbers',
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
