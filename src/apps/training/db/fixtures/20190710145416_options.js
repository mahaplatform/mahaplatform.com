const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('options').del()

  await knex('options').insert([])

}
