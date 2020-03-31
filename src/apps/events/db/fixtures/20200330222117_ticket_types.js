const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('ticket_types').del()

  await knex('ticket_types').insert([])

}
