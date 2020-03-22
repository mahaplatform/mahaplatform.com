const DeactivatePosts = {

  up: async (knex) => {
    await knex.schema.table('news_posts', (table) => {
      table.timestamp('deleted_at')
    })
  },

  down: async (knex) => {
  }

}

export default DeactivatePosts
