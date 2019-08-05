const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('filters').del()

  await knex('filters').insert([])

}
