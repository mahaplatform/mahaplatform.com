export const call = (code, number) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/crm/recordings',
  body: { code, number },
  request: 'CALL_REQUEST',
  success: 'CALL_SUCCESS',
  failure: 'CALL_FAILURE'
})

export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/assets/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const remove = () => ({
  type: 'REMOVE'
})

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
})

export const set = (asset) => ({
  type: 'SET',
  asset
})

export const updateNumber = (number) => ({
  type: 'UPDATE_NUMBER',
  number
})
