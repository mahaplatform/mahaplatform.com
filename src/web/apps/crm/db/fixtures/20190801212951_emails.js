const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('emails').del()

  await knex('emails').insert([])

}
