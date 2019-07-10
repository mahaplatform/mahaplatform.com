const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assignments').del()

  await knex('assignments').insert([])

}
