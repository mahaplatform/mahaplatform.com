const CreateGoals = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('competencies_goals', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('plan_id').unsigned()
      table.foreign('plan_id').references('competencies_plans.id')
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competencies_competencies.id')
      table.boolean('is_complete').defaultTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_goals')
  }

}

export default CreateGoals
