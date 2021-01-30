const CreateVoicemail = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('voicemails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('voicemails')
  }

}

export default CreateVoicemail
