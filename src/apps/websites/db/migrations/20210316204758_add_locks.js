const AddLocks = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_domains', (table) => {
      table.string('is_locked')
    })

  },

  down: async (knex) => {
  }

}

export default AddLocks
