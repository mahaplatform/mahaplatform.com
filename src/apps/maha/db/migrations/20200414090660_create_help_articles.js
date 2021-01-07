const CreateHelpArticle = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_help_articles', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.integer('video_id').unsigned()
      table.foreign('video_id').references('maha_assets.id')
      table.string('title')
      table.text('body')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_help_articles')
  }

}

export default CreateHelpArticle
