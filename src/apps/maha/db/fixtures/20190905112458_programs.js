const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('programs').del()

  await knex('programs').insert([])

}
