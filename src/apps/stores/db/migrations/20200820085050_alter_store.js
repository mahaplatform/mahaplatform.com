const AlterStore = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('stores_stores', (table) => {
      table.jsonb('config')
    })

    await knex('stores_stores').update({
      config: {
        reserve_inventory: 24
      }
    })

  },

  down: async (knex) => {
  }

}

export default AlterStore
