export const loadChat = () => ({
  type: 'LOCAL_GET',
  key: 'chat',
  request: 'LOAD_CHAT_REQUEST',
  success: 'LOAD_CHAT_SUCCESS',
  failure: 'LOAD_CHAT_FAILURE'
})

export const saveChat = (value) => ({
  type: 'LOCAL_SET',
  key: 'chat',
  value,
  request: 'SAVE_CHAT_REQUEST',
  success: 'SAVE_CHAT_SUCCESS',
  failure: 'SAVE_CHAT_FAILURE'
})

export const choose = (id) => ({
  type: 'CHOOSE',
  id
})

export const info = () => ({
  type: 'INFO'
})
