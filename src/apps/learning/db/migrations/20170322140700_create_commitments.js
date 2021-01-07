const CreateCommitments = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('competencies_commitments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('plan_id').unsigned()
      table.foreign('plan_id').references('competencies_plans.id')
      table.integer('resource_id').unsigned()
      table.foreign('resource_id').references('competencies_resources.id')
      table.text('description')
      table.boolean('is_complete').defaultTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_commitments')
  }

}

export default CreateCommitments
