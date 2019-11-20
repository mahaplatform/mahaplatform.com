const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('disbursements').del()

  await knex('disbursements').insert([])

}
