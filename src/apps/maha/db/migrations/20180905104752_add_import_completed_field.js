const AddImportCompletedField = {

  up: async (knex) => {
    await knex.schema.table('maha_imports', table => {
      table.integer('completed_count')
    })
  },

  down: async (knex) => {
    await knex.schema.table('maha_imports', table => {
      table.dropColumn('completed_count')
    })
  }

}

export default AddImportCompletedField
