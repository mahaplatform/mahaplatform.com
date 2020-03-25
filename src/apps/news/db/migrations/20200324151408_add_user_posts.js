const AddUserPosts = {

  up: async (knex) => {
    await knex.schema.table('news_posts', (table) => {
      table.integer('target_user_id').unsigned()
      table.foreign('target_user_id').references('maha_users.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddUserPosts
