const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('payment_methods').del()

  await knex('payment_methods').insert([])

}
