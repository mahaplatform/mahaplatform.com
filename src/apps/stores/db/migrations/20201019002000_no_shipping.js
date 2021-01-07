const NoShipping = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type stores_product_shipping_strategies add value \'none\'')

  },

  down: async (knex) => {
  }

}

export default NoShipping
