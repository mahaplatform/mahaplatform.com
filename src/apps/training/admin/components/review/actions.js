export const save = (endpoint, body) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint,
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const answer = (key, value) => ({
  type: 'ANSWER',
  key,
  value
})

export const back = () => ({
  type: 'BACK'
})
