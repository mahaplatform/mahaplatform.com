const CreateProduct = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('stores_products', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.string('code')
      table.string('title')
      table.text('description')
      table.specificType('options', 'jsonb[]')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_products')
  }

}

export default CreateProduct
