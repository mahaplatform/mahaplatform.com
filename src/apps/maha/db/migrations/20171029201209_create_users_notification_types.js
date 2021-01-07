const CreateUsersNotificationTypes = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_users_notification_types', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('notification_type_id').unsigned()
      table.foreign('notification_type_id').references('maha_notification_types.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_users_notification_types')
  }

}

export default CreateUsersNotificationTypes
