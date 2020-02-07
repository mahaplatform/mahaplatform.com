const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('settings').del()

  await knex('settings').insert([])

}
