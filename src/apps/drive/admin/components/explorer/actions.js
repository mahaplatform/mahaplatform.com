export const fetchFolder = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/drive/items/${id}`,
  request: 'FETCH_FOLDER_REQUEST',
  success: 'FETCH_FOLDER_SUCCESS',
  failure: 'FETCH_FOLDER_FAILURE'
})

export const createFile = (folder_id, asset_id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/drive/files',
  body: { folder_id, asset_id },
  request: 'CREATE_FILE_REQUEST',
  success: 'CREATE_FILE_SUCCESS',
  failure: 'CREATE_FILE_FAILURE'
})

export const updateFile = (code, asset_id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/drive/files/${code}`,
  body: { asset_id },
  request: 'UPDATE_FILE_REQUEST',
  success: 'UPDATE_FILE_SUCCESS',
  failure: 'UPDATE_FILE_FAILURE'
})

export const move = (codes, folder_id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: '/api/admin/drive/items/move',
  body: { codes, folder_id },
  request: 'MOVE_REQUEST',
  success: 'MOVE_SUCCESS',
  failure: 'MOVE_FAILURE'
})

export const changeFolder = (folder) => ({
  type: 'CHANGE_FOLDER',
  folder
})

export const ready = () => ({
  type: 'READY'
})

export const up = () => ({
  type: 'UP'
})

export const setQuery = (q) => ({
  type: 'SET_QUERY',
  q
})

export const addSelected = (item) => ({
  type: 'ADD_SELECTED',
  item
})

export const clearSelected = (item) => ({
  type: 'CLEAR_SELECTED'
})

export const replaceSelected = (item) => ({
  type: 'REPLACE_SELECTED',
  item
})

export const preview = (item) => ({
  type: 'PREVIEW',
  item
})

export const showDetails = (show) => ({
  type: 'SHOW_DETAILS',
  show
})

export const toggleView = () => ({
  type: 'TOGGLE_VIEW'
})
