const UpdateImportConfig = {

  up: async (knex) => {

    await knex.schema.table('maha_imports', (table) => {
      table.json('config')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateImportConfig
