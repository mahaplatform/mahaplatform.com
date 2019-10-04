const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('forms').del()

  await knex('forms').insert([])

}
