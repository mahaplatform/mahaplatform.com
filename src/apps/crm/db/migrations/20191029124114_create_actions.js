const CreateAction = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('actions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('enrollment_id').unsigned()
      table.foreign('enrollment_id').references('crm_enrollments.id')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('maha_stories.id')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('actions')
  }

}

export default CreateAction
