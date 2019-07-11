const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assignings').del()

  await knex('assignings').insert([])

}
