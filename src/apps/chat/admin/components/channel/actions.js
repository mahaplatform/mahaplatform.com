export const fetchAll = (channel_id, skip) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/chat/channels/${channel_id}/messages`,
  query: { $page: { skip } },
  request: 'FETCH_ALL_REQUEST',
  success: 'FETCH_ALL_SUCCESS',
  failure: 'FETCH_ALL_FAILURE'
})

export const fetch = (channel_id, id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/chat/channels/${channel_id}/messages/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const create = (channel_id, message) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/admin/chat/channels/${channel_id}/messages`,
  body: message,
  meta: { message },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})

export const type = (text) => ({
  type: 'TYPE',
  text
})

export const addAttachments = (attachments) => ({
  type: 'ADD_ATTACHMENTS',
  attachments
})

export const removeAttachment = (index) => ({
  type: 'REMOVE_ATTACHMENT',
  index
})

export const removeAttachments = () => ({
  type: 'REMOVE_ATTACHMENTS'
})

export const updateAttachment = (identifier, attachment) => ({
  type: 'UPDATE_ATTACHMENT',
  identifier,
  attachment
})

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
})

export const removeMessage = (code) => ({
  type: 'REMOVE_MESSAGE',
  code
})

export const showSignpost = (show) => ({
  type: 'SHOW_SIGNPOST',
  show
})

export const addQuotedMessage = (id) => ({
  type: 'ADD_QUOTED_MESSAGE',
  id
})

export const removeQuotedMessage = () => ({
  type: 'REMOVE_QUOTED_MESSAGE'
})
