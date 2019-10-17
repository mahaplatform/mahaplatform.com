const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('steps').del()

  await knex('steps').insert([])

}
