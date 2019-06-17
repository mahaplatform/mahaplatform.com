const CreateActivities = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_audits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('auditable_type')
      table.string('auditable_id')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('maha_stories.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_audits')
  }

}

export default CreateActivities
