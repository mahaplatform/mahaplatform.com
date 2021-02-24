const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('datasets').del()

  await knex('datasets').insert([])

}
