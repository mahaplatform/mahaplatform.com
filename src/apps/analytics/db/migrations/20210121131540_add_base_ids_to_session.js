const AddBaseIdsToSession = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('sessions', (table) => {
      table.integer('form_id')
      table.integer('event_id')
      table.integer('store_id')
      table.integer('website_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddBaseIdsToSession
