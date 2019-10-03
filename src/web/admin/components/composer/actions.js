export const fetchLink = (url) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body: { url },
  endpoint: '/api/admin/links',
  request: 'FETCH_LINK_REQUEST',
  success: 'FETCH_LINK_SUCCESS',
  failure: 'FETCH_LINK_FAILURE'
})

export const removeLink = () => ({
  type: 'REMOVE_LINK'
})

export const toggleEmojis = (editorState) => ({
  type: 'TOGGLE_EMOJIS'
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
