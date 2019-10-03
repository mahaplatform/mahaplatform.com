const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('lists').del()

  await knex('lists').insert([])

}
