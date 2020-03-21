const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('waitings').del()

  await knex('waitings').insert([])

}
