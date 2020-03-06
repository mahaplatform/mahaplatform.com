const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('incoming_emails').del()

  await knex('incoming_emails').insert([])

}
