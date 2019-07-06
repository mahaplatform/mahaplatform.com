const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('materials').del()

  await knex('materials').insert([])

}
