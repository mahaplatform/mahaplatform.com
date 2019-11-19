const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('scholarships').del()

  await knex('scholarships').insert([])

}
