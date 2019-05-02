export const fetchUnread = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/chat/unread',
  request: 'FETCH_UNREAD_REQUEST',
  success: 'FETCH_UNREAD_SUCCESS',
  failure: 'FETCH_UNREAD_FAILURE'
})

export const fetchChannels = (q, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  query,
  endpoint: '/api/admin/chat/channels',
  request: 'FETCH_CHANNELS_REQUEST',
  success: 'FETCH_CHANNELS_SUCCESS',
  failure: 'FETCH_CHANNELS_FAILURE'
})

export const activateChannel = (channel_id) => ({
  type: 'ACTIVATE_CHANNEL',
  channel_id
})

export const archiveChannel = (channel_id) => ({
  type: 'ARCHIVE_CHANNEL',
  channel_id
})

export const appear = (channel_id, user_id) => ({
  type: 'APPEAR',
  channel_id,
  user_id
})

export const addChannel = (channel) => ({
  type: 'ADD_CHANNEL',
  channel
})

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
})

export const addTyping = (channel_id, user_id, full_name) => ({
  type: 'ADD_TYPING',
  channel_id,
  user_id,
  full_name
})

export const disappear = (channel_id, user_id) => ({
  type: 'DISAPPEAR',
  channel_id,
  user_id
})

export const removeChannel = (channel_id) => ({
  type: 'REMOVE_CHANNEL',
  channel_id
})

export const removeTyping = (channel_id, user_id, full_name) => ({
  type: 'REMOVE_TYPING',
  channel_id,
  user_id,
  full_name
})

export const updateChannel = (channel) => ({
  type: 'UPDATE_CHANNEL',
  channel
})

export const updateRead = (user_id, channel_id, reader_id, message) => ({
  type: 'UPDATE_READ',
  user_id,
  channel_id,
  reader_id,
  message
})

export const updateUnread = (unread) => ({
  type: 'UPDATE_UNREAD',
  unread
})
