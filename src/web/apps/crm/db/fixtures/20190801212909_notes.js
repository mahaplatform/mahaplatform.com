const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('notes').del()

  await knex('notes').insert([])

}
