export const call = (code, number) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/crm/recordings',
  body: { code, number },
  request: 'CALL_REQUEST',
  success: 'CALL_SUCCESS',
  failure: 'CALL_FAILURE'
})

export const set = (asset) => ({
  type: 'SET',
  asset
})

export const updateNumber = (number) => ({
  type: 'UPDATE_NUMBER',
  number
})
