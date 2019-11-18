const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('line_items').del()

  await knex('line_items').insert([])

}
