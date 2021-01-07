const CreateCart = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('stores_carts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.string('code')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_carts')
  }

}

export default CreateCart
