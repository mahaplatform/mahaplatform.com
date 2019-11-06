const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('contact_notes').del()

  await knex('contact_notes').insert([])

}
