const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_results').del()

  await knex('email_results').insert([])

}
