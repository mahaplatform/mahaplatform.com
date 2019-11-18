const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('credits').del()

  await knex('credits').insert([])

}
