const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_enrollment_recordings').del()

  await knex('workflow_enrollment_recordings').insert([])

}
