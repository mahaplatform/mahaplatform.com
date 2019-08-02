const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('calls').del()

  await knex('calls').insert([])

}
