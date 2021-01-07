const CreateMember = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('news_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('news_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('news_members')
  }

}

export default CreateMember
