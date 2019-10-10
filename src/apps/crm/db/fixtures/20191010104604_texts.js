const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('texts').del()

  await knex('texts').insert([])

}
