const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('attendings').del()

  await knex('attendings').insert([])

}
