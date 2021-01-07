const CreateProgramMembers = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_program_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_program_members')
  }

}

export default CreateProgramMembers
