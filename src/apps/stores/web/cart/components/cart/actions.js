export const fetch = (name, code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/stores/stores/${name}/carts/${code}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const save = (name, code, data) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/stores/stores/${name}/carts/${code}`,
  body: { data },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})
