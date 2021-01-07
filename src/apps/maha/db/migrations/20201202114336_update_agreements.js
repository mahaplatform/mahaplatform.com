const UpdateAgreements = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_agreements', (table) => {
      table.integer('unsigned_id').unsigned()
      table.foreign('unsigned_id').references('maha_assets.id')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateAgreements
