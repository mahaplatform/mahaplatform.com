const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('groups').del()

  await knex('groups').insert([])

}
