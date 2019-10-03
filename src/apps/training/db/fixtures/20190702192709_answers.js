const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('answers').del()

  await knex('answers').insert([])

}
