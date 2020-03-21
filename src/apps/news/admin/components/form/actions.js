export const set = (text) => ({
  type: 'SET',
  text
})

export const save = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/news/posts',
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const addAttachments = (attachments) => ({
  type: 'ADD_ATTACHMENTS',
  attachments
})

export const removeAttachment = (index) => ({
  type: 'REMOVE_ATTACHMENT',
  index
})
