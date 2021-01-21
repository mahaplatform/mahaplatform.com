const AddSessionKeys = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('sessions', (table) => {
      table.integer('response_id')
      table.index('response_id')
      table.integer('registration_id')
      table.index('registration_id')
      table.integer('order_id')
      table.index('order_id')
    })

    await knex.schema.table('domain_users', (table) => {
      table.index('contact_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddSessionKeys
