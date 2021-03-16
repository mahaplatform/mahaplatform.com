const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('certificates').del()

  await knex('certificates').insert([])

}
