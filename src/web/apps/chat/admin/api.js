import { Segment } from '../../../core/backframe'
import channels from './api/channels'
import channelMessages from './api/channel_messages'
import channelSubscriptions from './api/channel_subscriptions'
import channelUsers from './api/channel_users'
import search from './api/search'
import starred from './api/starred'
import unread from './api/unread'

const api = new Segment({
  routes: [
    channels,
    channelMessages,
    channelSubscriptions,
    channelUsers,
    search,
    starred,
    unread
  ]
})

export default api
