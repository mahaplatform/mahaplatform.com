import Migration from '../../core/objects/migration'

const CreateNotificationTypes = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_notification_types', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.unique(['app_id', 'text'])
      table.string('text')
      table.string('description')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_notification_types')
  }

})

export default CreateNotificationTypes
