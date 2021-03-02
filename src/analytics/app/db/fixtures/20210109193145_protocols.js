const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('protocols').del()

  await knex('protocols').insert([])

}
