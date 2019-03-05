import { createSelector } from 'reselect'
import _ from 'lodash'

const active = (state, props) => state.active

const records = (state, props) => state.channels || []

const typing = (state, props) => state.typing

const messages = (state, props) => state.messages

const unread = (state, props) => state.unread

export const channels = createSelector(
  active,
  records,
  typing,
  messages,
  unread,
  (active, records, typing, messages, unread) => records.map(channel => ({
    ...channel,
    typing: _.find(typing, { channel_id: channel.id }),
    subscriptions: channel.subscriptions.map(subscription => ({
      ...subscription,
      active: _.findIndex(active, { channel_id: channel.id, user_id: subscription.id }) >= 0,
      typing: _.findIndex(typing, { channel_id: channel.id, user_id: subscription.id }) >= 0
    })),
    last_viewed: channel.subscriptions.reduce((last_viewed, subscription) => ({
      ...last_viewed,
      [subscription.last_message.id]: [
        ...last_viewed[subscription.last_message.id] || [],
        {
          id: subscription.id,
          full_name: subscription.full_name,
          photo: subscription.photo,
          viewed_at: subscription.last_message.viewed_at
        }
      ],
      typing: _.findIndex(typing, { channel_id: channel.id, user_id: subscription.id }) >= 0
    }), {}),
    unread: unread[channel.id] || 0
  })).sort((a, b) => {
    if(a.last_message_at < b.last_message_at) return 1
    if(a.last_message_at > b.last_message_at) return -1
    return 0
  })
)
