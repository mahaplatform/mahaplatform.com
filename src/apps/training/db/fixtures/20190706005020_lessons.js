const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('lessons').del()

  await knex('lessons').insert([])

}
