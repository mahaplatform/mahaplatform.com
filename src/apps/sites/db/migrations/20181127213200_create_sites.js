const CreateSites = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('sites_sites', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.boolean('requires_member_approval')
      table.boolean('has_public_member_submission')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_sites')
  }

}

export default CreateSites
