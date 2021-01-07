const CreateMembers = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('expenses_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('member_type_id').unsigned()
      table.foreign('member_type_id').references('expenses_member_types.id')
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_members')
  }

}

export default CreateMembers
