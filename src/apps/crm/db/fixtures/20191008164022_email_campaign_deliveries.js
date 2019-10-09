const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_campaign_deliveries').del()

  await knex('email_campaign_deliveries').insert([])

}
