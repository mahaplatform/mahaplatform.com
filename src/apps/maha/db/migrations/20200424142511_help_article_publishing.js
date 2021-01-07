const HelpArticlePublishing = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_help_articles', (table) => {
      table.bool('is_published')
    })
    await knex('maha_help_articles').update({
      is_published: true
    })
  },

  down: async (knex) => {
  }

}

export default HelpArticlePublishing
