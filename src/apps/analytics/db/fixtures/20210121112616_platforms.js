const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('platforms').del()

  await knex('platforms').insert([])

}
