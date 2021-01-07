const Material = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('training_materials', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('training_trainings.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_materials')
  }

}

export default Material
