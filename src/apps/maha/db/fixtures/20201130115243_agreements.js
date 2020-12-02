const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('agreements').del()

  await knex('agreements').insert([])

}
