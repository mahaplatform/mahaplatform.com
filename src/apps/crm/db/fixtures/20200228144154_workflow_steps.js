const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflow_steps').del()

  await knex('workflow_steps').insert([])

}
