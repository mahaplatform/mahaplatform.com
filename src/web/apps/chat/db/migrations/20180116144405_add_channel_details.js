const AddChannelDetails = {

  up: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.text('description')
    })

    await knex.schema.createTable('chat_message_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('chat_message_types').insert([
      { text: 'action' },
      { text: 'message' }
    ])

    await knex.schema.table('chat_messages', (table) => {
      table.integer('message_type_id').unsigned()
      table.foreign('message_type_id').references('chat_message_types.id')
    })

    await knex('chat_messages').update({ message_type_id: 2 })

    await knex('chat_channels').update({ is_archived: false })

  },

  down: async (knex) => {}

}

export default AddChannelDetails
