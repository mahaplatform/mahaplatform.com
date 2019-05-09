import Migration from '../../../../core/objects/migration'

const CreateCategories = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('competencies_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_categories')
  }

})

export default CreateCategories
