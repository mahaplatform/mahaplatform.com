export const choose = (id) => ({
  type: 'CHOOSE',
  id
})

export const setStarred = (show) => ({
  type: 'SET_STARRED',
  show
})

export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  message
})

export const setInfo = (show) => ({
  type: 'SET_INFO',
  show
})

export const setNew = (show) => ({
  type: 'SET_NEW',
  show
})

export const setEdit = (show) => ({
  type: 'SET_EDIT',
  show
})

export const setSubscriptions = (show) => ({
  type: 'SET_SUBSCRIPTONS',
  show
})
