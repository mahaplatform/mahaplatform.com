const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('apps').del()

  await knex('apps').insert([])

}
