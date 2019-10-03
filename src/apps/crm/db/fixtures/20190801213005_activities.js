const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('activities').del()

  await knex('activities').insert([])

}
