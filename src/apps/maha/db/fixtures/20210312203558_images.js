const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('images').del()

  await knex('images').insert([])

}
