const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('metro_codes').del()

  await knex('metro_codes').insert([])

}
