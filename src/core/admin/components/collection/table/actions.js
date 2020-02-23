export const loadHidden = (code, defaults) => ({
  type: 'LOCAL_GET',
  key: `table-${code}`,
  meta: { defaults },
  request: 'LOAD_HIDDEN_REQUEST',
  success: 'LOAD_HIDDEN_SUCCESS',
  failure: 'LOAD_HIDDEN_FAILURE'
})

export const saveHidden = (code, columns) => ({
  type: 'LOCAL_SET',
  key: `table-${code}`,
  value: columns,
  request: 'SAVE_HIDDEN_REQUEST',
  success: 'SAVE_HIDDEN_SUCCESS',
  failure: 'SAVE_HIDDEN_FAILURE'
})

export const toggleHidden = (key) => ({
  type: 'TOGGLE_HIDDEN',
  key
})

export const setWidth = (width) => ({
  type: 'SET_WIDTH',
  width
})
