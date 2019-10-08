const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('voice_campaigns').del()

  await knex('voice_campaigns').insert([])

}
