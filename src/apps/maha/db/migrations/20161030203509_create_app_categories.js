const CreateAppCategories = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_app_categories', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_app_categories')
  }

}

export default CreateAppCategories
