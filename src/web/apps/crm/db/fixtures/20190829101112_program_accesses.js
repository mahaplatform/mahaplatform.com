const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('program_accesses').del()

  await knex('program_accesses').insert([])

}
