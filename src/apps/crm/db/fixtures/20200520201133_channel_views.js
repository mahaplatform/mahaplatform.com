const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('channel_views').del()

  await knex('channel_views').insert([])

}
