const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('reservations').del()

  await knex('reservations').insert([])

}
