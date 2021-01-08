const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('contents').del()

  await knex('contents').insert([])

}
