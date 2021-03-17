const AddLocks = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_domains', (table) => {
      table.boolean('is_locked')
      table.string('auth_code')
    })

  },

  down: async (knex) => {
  }

}

export default AddLocks
