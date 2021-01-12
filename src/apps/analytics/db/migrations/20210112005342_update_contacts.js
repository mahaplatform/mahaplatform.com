const UpdateContacts = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('domain_users', (table) => {
      table.dropColumn('network_user_id')
      table.integer('contact_id')
    })

    await knex.schema.dropTable('contacts')

    await knex.schema.dropTable('network_users')

  },

  down: async (knex) => {
  }

}

export default UpdateContacts
