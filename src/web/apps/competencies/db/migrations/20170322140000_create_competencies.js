import Migration from '../../../../../core/objects/migration'

const CreateCompetencies = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('competencies_competencies', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('competencies_categories.id')
      table.string('title')
      table.text('description')
      table.integer('level')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_competencies')
  }

})

export default CreateCompetencies
