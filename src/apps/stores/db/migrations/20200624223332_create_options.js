const CreateOption = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('stores_options', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('stores_products.id')
      table.string('title')
      table.string('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_options')
  }

}

export default CreateOption
