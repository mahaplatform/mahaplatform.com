const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('os').del()

  await knex('os').insert([])

}
