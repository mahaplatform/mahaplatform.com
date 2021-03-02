const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('campaigns').del()

  await knex('campaigns').insert([])

}
