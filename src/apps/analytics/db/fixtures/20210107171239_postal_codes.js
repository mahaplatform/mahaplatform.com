const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('postal_codes').del()

  await knex('postal_codes').insert([])

}
