const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('announcements').del()

  await knex('announcements').insert([])

}
