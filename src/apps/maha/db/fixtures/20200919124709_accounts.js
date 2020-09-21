const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('accounts').del()

  await knex('accounts').insert([])

}
