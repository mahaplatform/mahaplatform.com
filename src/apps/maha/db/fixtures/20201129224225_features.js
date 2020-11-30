const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('features').del()

  await knex('features').insert([])

}
