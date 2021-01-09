const CreateNetworkUser = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('network_users', (table) => {
      table.increments('id').primary()
      table.string('network_userid')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('network_users')
  }

}

export default CreateNetworkUser
