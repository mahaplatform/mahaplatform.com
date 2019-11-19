const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('merchants').del()

  await knex('merchants').insert([])

}
