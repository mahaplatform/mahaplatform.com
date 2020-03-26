const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('locations').del()

  await knex('locations').insert([])

}
