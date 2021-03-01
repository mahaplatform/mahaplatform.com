const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('responses').del()

  await knex('responses').insert([])

}
