const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('products').del()

  await knex('products').insert([])

}
