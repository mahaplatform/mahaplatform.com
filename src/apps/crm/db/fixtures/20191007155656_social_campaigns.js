const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('social_campaigns').del()

  await knex('social_campaigns').insert([])

}
