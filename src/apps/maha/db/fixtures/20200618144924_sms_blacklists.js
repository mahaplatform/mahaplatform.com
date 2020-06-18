const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms_blacklists').del()

  await knex('sms_blacklists').insert([])

}
