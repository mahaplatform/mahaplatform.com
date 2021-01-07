const CreateSocialCampaign = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_social_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('profile_id').unsigned()
      table.foreign('profile_id').references('maha_profiles.id')
      table.enum('status', ['draft','published'], { useNative: true, enumName: 'crm_social_campaigns_status' })
      table.string('title')
      table.string('code')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_social_campaigns')
  }

}

export default CreateSocialCampaign
