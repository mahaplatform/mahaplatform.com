export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/assets/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (transforms) => ({
  type: 'SET',
  transforms
})

export const adjust = (key, value) => ({
  type: 'ADJUST',
  key,
  value
})

export const crop = (cropping) => ({
  type: 'CROP',
  cropping
})

export const setRatio = (ratio) => ({
  type: 'SET_RATIO',
  ratio
})

export const setDimensions = (width, height) => ({
  type: 'SET_DIMENSIONS',
  width,
  height
})
