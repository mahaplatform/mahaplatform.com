const DeleteStore = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('delete from stores_photos where variant_id <= 7')

    await knex.raw('delete from stores_variants where id <= 7')

    await knex.raw('delete from stores_products where store_id = 1')

    await knex.raw('delete from stores_carts where store_id = 1')

    await knex.raw('delete from stores_categories where store_id = 1')

    await knex.raw('delete from stores_stores where id = 1')

  },

  down: async (knex) => {
  }

}

export default DeleteStore
