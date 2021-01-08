const CreateUser = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('user_id')
      table.string('domain_userid')
      table.string('network_userid')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('users')
  }

}

export default CreateUser
