const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('email_activities').del()

  await knex('email_activities').insert([])

}
