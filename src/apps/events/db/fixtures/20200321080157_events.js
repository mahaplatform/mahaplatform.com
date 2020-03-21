const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('events').del()

  await knex('events').insert([])

}
