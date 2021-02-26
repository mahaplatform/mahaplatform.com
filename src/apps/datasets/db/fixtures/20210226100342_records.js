const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('records').del()

  await knex('records').insert([])

}
