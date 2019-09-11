const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('numbers').del()

  await knex('numbers').insert([])

}
