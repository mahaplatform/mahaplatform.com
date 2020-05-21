const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms_receipts').del()

  await knex('sms_receipts').insert([])

}
