const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('tags').del()

  await knex('tags').insert([])

}
