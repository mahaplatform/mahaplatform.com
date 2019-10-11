const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('faxes').del()

  await knex('faxes').insert([])

}
