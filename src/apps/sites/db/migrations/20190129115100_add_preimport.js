const AddPreimport = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.jsonb('preimport')
    })

  },

  down: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.dropColumn('preimport')
    })

  }

}

export default AddPreimport
