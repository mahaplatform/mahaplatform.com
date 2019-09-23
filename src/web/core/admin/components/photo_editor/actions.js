export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/assets/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (asset_id, transforms) => ({
  type: 'SET',
  asset_id,
  transforms
})

export const adjust = (key, value) => ({
  type: 'ADJUST',
  key,
  value
})
