const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('devices').del()

  await knex('devices').insert([])

}
