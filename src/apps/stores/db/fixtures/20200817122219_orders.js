const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('orders').del()

  await knex('orders').insert([])

}
