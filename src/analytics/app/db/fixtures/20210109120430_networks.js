const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('networks').del()

  await knex('networks').insert([])

}
