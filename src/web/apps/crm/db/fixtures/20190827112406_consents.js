const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('consents').del()

  await knex('consents').insert([])

}
