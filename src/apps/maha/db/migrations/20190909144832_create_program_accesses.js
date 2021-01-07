const CreateProgramAccess = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_program_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.integer('grouping_id').unsigned()
      table.foreign('grouping_id').references('maha_groupings.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_program_accesses')
  }

}

export default CreateProgramAccess
