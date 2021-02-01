const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('call_connections').del()

  await knex('call_connections').insert([])

}
