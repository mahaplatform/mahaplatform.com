const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('network_users').del()

  await knex('network_users').insert([])

}
