const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('voice_campaign_results').del()

  await knex('voice_campaign_results').insert([])

}
