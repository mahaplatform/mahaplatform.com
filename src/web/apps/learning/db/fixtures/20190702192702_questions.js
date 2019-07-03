const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('questions').del()

  await knex('questions').insert([])

}
