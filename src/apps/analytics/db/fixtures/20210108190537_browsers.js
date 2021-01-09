const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('browsers').del()

  await knex('browsers').insert([])

}
