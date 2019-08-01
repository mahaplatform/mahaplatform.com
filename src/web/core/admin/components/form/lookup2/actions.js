export const fetch = (endpoint, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (records) => ({
  type: 'SET',
  records
})

export const begin = () => ({
  type: 'BEGIN'
})

export const end = () => ({
  type: 'END'
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const showForm = () => ({
  type: 'SHOW_FORM'
})

export const select = (selected) => ({
  type: 'SELECT',
  selected
})

export const hideForm = () => ({
  type: 'HIDE_FORM'
})

export const refresh = () => ({
  type: 'REFRESH'
})
