const CreateCategoryTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view stores_category_totals as
      select stores_categories.id as category_id,
      count(stores_products_categories.*) as products_count
      from stores_categories
      inner join stores_products_categories on stores_products_categories.category_id=stores_categories.id
      group by stores_categories.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCategoryTotals
