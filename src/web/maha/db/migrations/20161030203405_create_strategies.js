import Migration from '../../core/objects/migration'

const CreateStrategies = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_strategies', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_strategies')
  }

})

export default CreateStrategies
