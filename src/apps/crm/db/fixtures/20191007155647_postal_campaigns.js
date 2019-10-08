const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('postal_campaigns').del()

  await knex('postal_campaigns').insert([])

}
