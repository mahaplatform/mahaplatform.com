const AddUserAgent = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('sessions', (table) => {
      table.text('useragent')
    })

  },

  down: async (knex) => {
  }

}

export default AddUserAgent
