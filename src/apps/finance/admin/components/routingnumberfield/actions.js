export const lookup = (number) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/merchants/lookup',
  query: { number },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const update = (number) => ({
  type: 'UPDATE',
  number
})
