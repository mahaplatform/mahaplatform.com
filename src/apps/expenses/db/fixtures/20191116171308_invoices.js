const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('invoices').del()

  await knex('invoices').insert([])

}
