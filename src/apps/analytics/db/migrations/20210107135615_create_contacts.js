const CreateContact = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary()
      table.integer('network_user_id').unsigned()
      table.foreign('network_user_id').references('network_users.id')
      table.integer('contact_id')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('contacts')
  }

}

export default CreateContact
