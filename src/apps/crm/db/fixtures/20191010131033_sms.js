const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms').del()

  await knex('sms').insert([])

}
