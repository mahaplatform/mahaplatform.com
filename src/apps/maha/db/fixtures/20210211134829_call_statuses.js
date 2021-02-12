const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('call_statuses').del()

  await knex('call_statuses').insert([])

}
