const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms_campaign_results').del()

  await knex('sms_campaign_results').insert([])

}
