const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('users').del()

  await knex('users').insert([])

}
