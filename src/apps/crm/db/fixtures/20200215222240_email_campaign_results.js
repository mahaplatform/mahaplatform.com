const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_campaign_results').del()

  await knex('email_campaign_results').insert([])

}
