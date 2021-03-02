const CreateDomainUser = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('domain_users', (table) => {
      table.increments('id').primary()
      table.string('domain_userid')
      table.integer('contact_id')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('domain_users')
  }

}

export default CreateDomainUser
