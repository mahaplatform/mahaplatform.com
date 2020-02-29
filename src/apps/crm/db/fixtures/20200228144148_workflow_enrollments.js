const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_enrollments').del()

  await knex('workflow_enrollments').insert([])

}
