const AddProgramLogo = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_programs', (table) => {
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('maha_assets.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddProgramLogo
