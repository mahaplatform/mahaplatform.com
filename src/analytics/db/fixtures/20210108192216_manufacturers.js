const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('manufacturers').del()

  await knex('manufacturers').insert([])

}
