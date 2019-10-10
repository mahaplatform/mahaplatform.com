const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sms_attachments').del()

  await knex('sms_attachments').insert([])

}
