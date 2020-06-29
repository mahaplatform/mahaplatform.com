const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('allocations').del()

  await knex('allocations').insert([])

}
