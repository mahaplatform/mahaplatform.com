const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_attachments').del()

  await knex('email_attachments').insert([])

}
