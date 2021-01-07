const DeactivatePosts = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('news_posts', (table) => {
      table.timestamp('deleted_at')
    })
  },

  down: async (knex) => {
  }

}

export default DeactivatePosts
