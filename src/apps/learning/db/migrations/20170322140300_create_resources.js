const CreateResources = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('competencies_resources', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.text('description')
      table.string('url')
      table.decimal('review_average', 2, 1).default(0.0)
      table.integer('review_count').default(0)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_resources')
  }

}

export default CreateResources
