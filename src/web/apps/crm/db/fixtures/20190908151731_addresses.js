const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('addresses').del()

  await knex('addresses').insert([])

}
