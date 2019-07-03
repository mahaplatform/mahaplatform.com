const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('administrations').del()

  await knex('administrations').insert([])

}
