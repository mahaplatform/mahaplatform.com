const CreateProjects = {

  up: async (knex) => {
    return await knex.schema.createTable('expenses_projects', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.boolean('is_active').defaultTo(false)
      table.jsonb('integration')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_projects')
  }

}

export default CreateProjects
