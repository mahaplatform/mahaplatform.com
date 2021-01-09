const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('contacts').del()

  await knex('contacts').insert([])

}
