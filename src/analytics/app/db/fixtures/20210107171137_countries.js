const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('countries').del()

  await knex('countries').insert([])

}
