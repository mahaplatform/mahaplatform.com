const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('responsibility_types').del()

  await knex('responsibility_types').insert([])

}
