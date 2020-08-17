const CreateCart = {

  up: async (knex) => {
    await knex.schema.createTable('carts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('carts')
  }

}

export default CreateCart
