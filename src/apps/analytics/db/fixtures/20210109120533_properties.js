const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('properties').del()

  await knex('properties').insert([])

}
