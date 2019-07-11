const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('fulfillments').del()

  await knex('fulfillments').insert([])

}
