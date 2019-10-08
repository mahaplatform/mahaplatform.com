const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_campaigns').del()

  await knex('email_campaigns').insert([])

}
