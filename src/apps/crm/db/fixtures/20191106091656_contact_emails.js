const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('contact_emails').del()

  await knex('contact_emails').insert([])

}
