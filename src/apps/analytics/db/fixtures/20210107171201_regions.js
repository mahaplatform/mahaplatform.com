const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('regions').del()

  await knex('regions').insert([])

}
