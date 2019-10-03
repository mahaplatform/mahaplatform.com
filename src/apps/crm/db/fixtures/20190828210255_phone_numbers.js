const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('phone_numbers').del()

  await knex('phone_numbers').insert([])

}
