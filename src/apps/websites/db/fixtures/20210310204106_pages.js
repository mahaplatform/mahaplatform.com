const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('pages').del()

  await knex('pages').insert([])

}
