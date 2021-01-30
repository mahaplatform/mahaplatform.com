const CreateVoicemail = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_voicemails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('maha_calls.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.string('code')
      table.integer('duration')
      table.boolean('was_heard')
      table.boolean('was_handled')
      table.timestamp('deleted_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_voicemails')
  }

}

export default CreateVoicemail
