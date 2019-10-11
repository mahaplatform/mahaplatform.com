export const lookup = (areacode) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/team/numbers/lookup',
  query: { areacode },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const choose = (index) => ({
  type: 'CHOOSE',
  index
})

export const clear = () => ({
  type: 'CLEAR'
})
