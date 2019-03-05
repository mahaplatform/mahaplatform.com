export const setSources = (sources) => ({
  type: 'SET_SOURCES',
  sources
})

export const chooseSource = (index) => ({
  type: 'CHOOSE_SOURCE',
  index
})

export const addFile = (file) => ({
  type: 'ADD_FILE',
  file
})

export const addAsset = (file_id, asset) => ({
  type: 'ADD_ASSET',
  file_id,
  asset
})

export const removeFile = (file) => ({
  type: 'REMOVE_FILE',
  file
})

export const removeAsset = (asset) => ({
  type: 'REMOVE_ASSET',
  asset
})

export const create = (endpoint, file) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body: { id: file.id },
  meta: { file },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})
