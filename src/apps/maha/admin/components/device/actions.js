export const loadFingerprint = () => ({
  type: 'LOCAL_GET',
  key: 'fingerprint',
  request: 'LOAD_FINGERPRINT_REQUEST',
  success: 'LOAD_FINGERPRINT_SUCCESS',
  failure: 'LOAD_FINGERPRINT_FAILURE'
})

export const saveFingerprint = (value) => ({
  type: 'LOCAL_SET',
  key: 'fingerprint',
  value,
  request: 'SAVE_FINGERPRINT_REQUEST',
  success: 'SAVE_FINGERPRINT_SUCCESS',
  failure: 'SAVE_FINGERPRINT_FAILURE'
})

export const createDevice = (fingerprint) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/devices',
  body: { fingerprint },
  request: 'CREATE_DEVICE_REQUEST',
  success: 'CREATE_DEVICE_SUCCESS',
  failure: 'CREATE_DEVICE_FAILURE'
})

export const fetchDevice = (fingerprint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/devices/${fingerprint}`,
  request: 'FETCH_DEVICE_REQUEST',
  success: 'FETCH_DEVICE_SUCCESS',
  failure: 'FETCH_DEVICE_FAILURE'
})

export const updateDevice = (fingerprint, push_token) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/devices/${fingerprint}`,
  body: { push_token },
  request: 'UPDATE_DEVICE_REQUEST',
  success: 'UPDATE_DEVICE_SUCCESS',
  failure: 'UPDATE_DEVICE_FAILURE'
})
