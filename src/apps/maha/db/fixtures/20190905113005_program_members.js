const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('program_members').del()

  await knex('program_members').insert([])

}
