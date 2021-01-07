const CreateActivity = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('type')
      table.jsonb('data')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('maha_stories.id')
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('crm_calls.id')
      table.integer('note_id').unsigned()
      table.foreign('note_id').references('crm_notes.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_activities')
  }

}

export default CreateActivity
