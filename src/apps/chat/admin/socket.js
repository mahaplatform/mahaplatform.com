import knex from '@core/vendor/knex'

const chat = async (io, socket) => {

  socket.on('chat', async (token, channel, data) => {

    const subscriptions = await knex('chat_subscriptions').where(qb => {

      qb.where({ channel_id: data.data.channel_id })

      if(data.data.exclude) qb.whereNotIn('user_id', data.data.exclude)

    })

    await Promise.map(subscriptions, async (subscription) => {

      await io.in(`/admin/users/${subscription.user_id}`).emit('message', {
        target: '/admin/chat/messages',
        action: data.action,
        data: {
          channel_id: data.data.channel_id,
          user: data.data.user
        }
      })

    })

  })

}

export default chat
