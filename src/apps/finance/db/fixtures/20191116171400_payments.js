const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('payments').del()

  await knex('payments').insert([])

}
