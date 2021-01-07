const CreatePostalCampaign = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_postal_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.enum('status', ['draft','published'], { useNative: true, enumName: 'crm_postal_campaigns_status' })
      table.string('title')
      table.string('code')
      table.jsonb('to')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_postal_campaigns')
  }

}

export default CreatePostalCampaign
