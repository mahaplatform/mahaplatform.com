const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('stores').del()

  await knex('stores').insert([])

}
