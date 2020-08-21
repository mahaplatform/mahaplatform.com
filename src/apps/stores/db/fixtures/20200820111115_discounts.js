const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('discounts').del()

  await knex('discounts').insert([])

}
