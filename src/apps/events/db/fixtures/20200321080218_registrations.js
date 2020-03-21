const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('registrations').del()

  await knex('registrations').insert([])

}
