import Migration from '../../../../../core/objects/migration'

const CreateCounties = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_counties', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_counties')
  }

})

export default CreateCounties
