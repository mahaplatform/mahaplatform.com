const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('variants').del()

  await knex('variants').insert([])

}
