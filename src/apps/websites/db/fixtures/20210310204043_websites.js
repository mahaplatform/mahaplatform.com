const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('websites').del()

  await knex('websites').insert([])

}
