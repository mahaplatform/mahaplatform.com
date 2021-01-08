const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('event_types').del()

  await knex('event_types').insert([])

}
