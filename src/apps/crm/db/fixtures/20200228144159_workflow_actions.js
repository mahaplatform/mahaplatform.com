const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_actions').del()

  await knex('workflow_actions').insert([])

}
