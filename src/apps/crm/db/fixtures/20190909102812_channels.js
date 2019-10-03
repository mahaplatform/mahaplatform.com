const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('channels').del()

  await knex('channels').insert([])

}
