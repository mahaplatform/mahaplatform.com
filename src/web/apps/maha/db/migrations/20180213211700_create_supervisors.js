const CreateSupervisors = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_supervisors', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_supervisors')
  }

}

export default CreateSupervisors
