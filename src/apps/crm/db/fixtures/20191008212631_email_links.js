const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_links').del()

  await knex('email_links').insert([])

}
