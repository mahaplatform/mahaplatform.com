const UpdateCategoryTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view stores_category_totals')
    await knex.raw(`
      create view stores_category_totals as
      select stores_categories.id as category_id,
      coalesce(count(stores_products_categories.*), 0) as products_count
      from stores_categories
      left join stores_products_categories on stores_products_categories.category_id=stores_categories.id
      group by stores_categories.id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateCategoryTotals
