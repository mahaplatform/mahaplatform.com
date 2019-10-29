const CreateAction = {

  up: async (knex) => {
    await knex.schema.createTable('actions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('actions')
  }

}

export default CreateAction
