const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('filter_accesses').del()

  await knex('filter_accesses').insert([])

}
