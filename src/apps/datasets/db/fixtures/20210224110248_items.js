const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('items').del()

  await knex('items').insert([])

}
