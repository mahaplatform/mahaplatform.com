const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('categories').del()

  await knex('categories').insert([])

}
