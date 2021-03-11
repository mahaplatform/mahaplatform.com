const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('domains').del()

  await knex('domains').insert([])

}
