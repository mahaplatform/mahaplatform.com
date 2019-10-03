const CreateResults = {

  up: async (knex) => {

    await knex.schema.table('chat_messages', (table) => {
      table.integer('device_id').unsigned()
      table.foreign('device_id').references('maha_devices.id')
    })

    const messages = await knex('chat_messages')

    await Promise.mapSeries(messages, async message => {

      const device = await knex('maha_sessions').select('maha_devices.*').innerJoin('maha_devices','maha_devices.id','maha_sessions.device_id').where({
        user_id: message.user_id
      }).orderBy('maha_sessions.last_active_at','desc')

      await knex('chat_messages').where({
        id: message.id
      }).update({
        device_id: device[0].id
      })

    })

  },

  down: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.dropColumn('device_id')
    })

  }

}

export default CreateResults
