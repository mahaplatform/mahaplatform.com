const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('deposit').del()

  await knex('deposit').insert([])

}
