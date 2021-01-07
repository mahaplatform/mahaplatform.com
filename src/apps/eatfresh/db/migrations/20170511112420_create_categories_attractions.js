const CreateCategoriesAttractions = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_categories_attractions', (table) => {
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('eatfresh_categories.id')
      table.integer('attraction_id').unsigned()
      table.foreign('attraction_id').references('eatfresh_attractions.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_categories_attractions')
  }

}

export default CreateCategoriesAttractions
