import Migration from '../../../../core/objects/migration'

const AddNotificationMethod = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('maha_notification_channels', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('maha_notification_channels').insert([
      { text: 'app' },
      { text: 'push' },
      { text: 'email' }
    ])

    await knex.schema.table('maha_notifications', (table) => {
      table.integer('channel_id').unsigned()
      table.foreign('channel_id').references('maha_notification_channels.id')
    })

    await knex('maha_notifications').update({
      channel_id: 1
    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_notifications', (table) => {
      table.dropColumn('channel_id')
    })

    await knex.schema.dropTable('maha_notification_channels')

  }

})

export default AddNotificationMethod
