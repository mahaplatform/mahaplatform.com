const CreateRoles = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_roles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_roles')
  }

}

export default CreateRoles
