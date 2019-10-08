const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms_campaigns').del()

  await knex('sms_campaigns').insert([])

}
