const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_emails').del()

  await knex('workflow_emails').insert([])

}
