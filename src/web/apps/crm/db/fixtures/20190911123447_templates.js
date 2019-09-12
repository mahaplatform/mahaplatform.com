const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('templates').del()

  await knex('templates').insert([])

}
