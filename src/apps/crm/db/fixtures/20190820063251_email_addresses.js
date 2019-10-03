const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_addresses').del()

  await knex('email_addresses').insert([])

}
