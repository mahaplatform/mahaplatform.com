const UpdateSavedFilters = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_filters', (table) => {
      table.dropColumn('criteria')
    })
    await knex.schema.table('maha_filters', (table) => {
      table.jsonb('config')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateSavedFilters
