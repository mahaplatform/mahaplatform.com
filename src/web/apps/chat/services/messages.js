export const getUnread = async (req, user_id) => {

  const result = await req.trx('chat_subscriptions')
    .select(req.trx.raw('chat_subscriptions.channel_id, count(chat_messages.*) as unread'))
    .joinRaw('inner join chat_channels on chat_channels.id = chat_subscriptions.channel_id')
    .joinRaw('left join chat_messages on chat_messages.channel_id = chat_subscriptions.channel_id and chat_messages.created_at > chat_subscriptions.last_viewed_at')
    .whereRaw('chat_subscriptions.user_id = ?', [user_id])
    .groupBy('chat_subscriptions.channel_id')

  return result.reduce((count, row) => ({
    ...count,
    [row.channel_id]: parseInt(row.unread)
  }), {})

}
