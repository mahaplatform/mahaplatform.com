const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('call_activities').del()

  await knex('call_activities').insert([])

}
