const CreateAgreement = {

  up: async (knex) => {

    await knex.schema.createTable('maha_agreements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('unsigned_id').unsigned()
      table.foreign('unsigned_id').references('maha_assets.id')
      table.integer('signed_id').unsigned()
      table.foreign('signed_id').references('maha_assets.id')
      table.string('adobe_agreement_id')
      table.string('adobe_signing_id')
      table.string('name')
      table.string('email')
      table.timestamps()
    })

    await knex.raw('alter type maha_asset_sources add value \'adobesign\'')

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_agreements')
  }

}

export default CreateAgreement
