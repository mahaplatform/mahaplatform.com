const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('cart_items').del()

  await knex('cart_items').insert([])

}
