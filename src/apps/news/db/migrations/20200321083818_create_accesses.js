const CreateAccess = {

  up: async (knex) => {
    await knex.schema.createTable('news_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('news_posts.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('code')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('news_accesses')
  }

}

export default CreateAccess
