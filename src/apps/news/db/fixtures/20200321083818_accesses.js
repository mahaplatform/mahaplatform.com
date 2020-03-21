const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('accesses').del()

  await knex('accesses').insert([])

}
