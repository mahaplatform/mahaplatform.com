const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('senders').del()

  await knex('senders').insert([])

}
