const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('referers').del()

  await knex('referers').insert([])

}
