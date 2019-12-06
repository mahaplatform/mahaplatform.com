const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('cards').del()

  await knex('cards').insert([])

}
