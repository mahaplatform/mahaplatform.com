const CreateCategory = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('stores_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.integer('delta')
      table.string('title')
      table.string('slug')
      table.timestamps()
    })

    await knex.schema.table('stores_products', (table) => {
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('stores_categories.id')
    })

    await knex('stores_categories').insert([
      { team_id: 1, store_id: 1, title: 'Clothes' },
      { team_id: 1, store_id: 1, title: 'Workshops' },
      { team_id: 1, store_id: 1, title: 'Software' }
    ])

    await knex('stores_products').where('id', 1).update({
      category_id: 1,
      options: [
        { title: 'Color', values: ['red','orange','yellow'] },
        { title: 'Size', values: ['small','medium','large'] }
      ]
    })

    await knex('stores_products').where('id', 2).update({
      category_id: 1,
      options: [
        { title: 'Color', values: ['red','orange','yellow'] },
        { title: 'Size', values: ['11','12'] }
      ]
    })

    await knex('stores_products').where('id', 3).update({
      category_id: 2,
      options: [
        { title: 'Version', values: ['red','orange','yellow'] }
      ]
    })

    await knex('stores_products').where('id', 4).update({
      category_id: 3,
      options: null
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_categories')
  }

}

export default CreateCategory
