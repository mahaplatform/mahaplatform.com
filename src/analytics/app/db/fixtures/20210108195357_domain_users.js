const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('domain_users').del()

  await knex('domain_users').insert([])

}
