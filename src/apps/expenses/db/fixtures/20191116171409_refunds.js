const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('refunds').del()

  await knex('refunds').insert([])

}
