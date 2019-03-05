import { knex  } from 'maha'

export const getUnread = async (user_id, trx) => {

  const select = knex.raw('chat_subscriptions.channel_id, count(chat_messages.*) as unread')

  const channelsJoin = 'inner join chat_channels on chat_channels.id = chat_subscriptions.channel_id'

  const messagesJoin = 'left join chat_messages on chat_messages.channel_id = chat_subscriptions.channel_id and chat_messages.created_at > chat_subscriptions.last_viewed_at'

  const result = await knex('chat_subscriptions').transacting(trx).select(select).joinRaw(channelsJoin).joinRaw(messagesJoin).whereRaw('chat_subscriptions.user_id = ? and chat_channels.is_archived != ?', [user_id, true]).groupBy('chat_subscriptions.channel_id')

  return result.reduce((count, row) => ({
    ...count,
    [row.channel_id]: parseInt(row.unread)
  }), {})

}
