const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('types').del()

  await knex('types').insert([])

}
