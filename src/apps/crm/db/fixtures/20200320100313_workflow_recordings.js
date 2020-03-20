const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_recordings').del()

  await knex('workflow_recordings').insert([])

}
