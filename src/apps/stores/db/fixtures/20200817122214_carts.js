const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('carts').del()

  await knex('carts').insert([])

}
