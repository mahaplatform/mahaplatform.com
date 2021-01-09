const CreateDomainUser = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('domain_users', (table) => {
      table.increments('id').primary()
      table.integer('network_user_id').unsigned()
      table.foreign('network_user_id').references('network_users.id')
      table.string('domain_userid')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('domain_users')
  }

}

export default CreateDomainUser
