const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('enrollments').del()

  await knex('enrollments').insert([])

}
