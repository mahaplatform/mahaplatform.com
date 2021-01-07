const CreateLike = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('news_likes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('news_posts.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('news_likes')
  }

}

export default CreateLike
