const AddPostLinks = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('news_posts', (table) => {
      table.integer('link_id').unsigned()
      table.foreign('link_id').references('maha_links.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddPostLinks
