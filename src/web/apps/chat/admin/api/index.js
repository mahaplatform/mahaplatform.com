import channelSubscriptions from './channel_subscriptions'
import { Segment } from '../../../../core/backframe'
import channelMessages from './channel_messages'
import channelUsers from './channel_users'
import channels from './channels'
import starred from './starred'
import unread from './unread'
import search from './search'

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
