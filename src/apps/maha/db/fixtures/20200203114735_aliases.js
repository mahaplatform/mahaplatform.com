const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('aliases').del()

  await knex('aliases').insert([])

}
