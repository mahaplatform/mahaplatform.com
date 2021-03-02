const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sources').del()

  await knex('sources').insert([])

}
