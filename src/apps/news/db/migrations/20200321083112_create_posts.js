const CreatePost = {

  up: async (knex) => {
    await knex.schema.createTable('news_posts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.text('text')
      table.jsonb('config')
      table.enum('type', ['public','private'], { useNative: true, enumName: 'news_posts_type' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('news_posts')
  }

}

export default CreatePost
