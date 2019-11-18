const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('revenue_types').del()

  await knex('revenue_types').insert([])

}
