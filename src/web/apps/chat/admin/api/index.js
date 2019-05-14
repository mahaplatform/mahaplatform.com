import channelSubscriptions from './channel_subscriptions'
import { Segment } from '../../../../core/backframe'
import channelMessages from './channel_messages'
import channelUsers from './channel_users'
import channels from './channels'

const api = new Segment({
  routes: [
    channels,
    channelMessages,
    channelSubscriptions,
    channelUsers
  ]
})

export default api
