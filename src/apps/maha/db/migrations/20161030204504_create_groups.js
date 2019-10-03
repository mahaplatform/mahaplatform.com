const CreateGroups = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_groups', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_groups')
  }

}

export default CreateGroups
