const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('dashboard_cards').del()

  await knex('dashboard_cards').insert([])

}
