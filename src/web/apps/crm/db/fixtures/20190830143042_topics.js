const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('topics').del()

  await knex('topics').insert([])

}
