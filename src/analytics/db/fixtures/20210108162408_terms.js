const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('terms').del()

  await knex('terms').insert([])

}
