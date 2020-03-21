const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('tickets').del()

  await knex('tickets').insert([])

}
