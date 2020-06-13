const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('dashboard_card_types').del()

  await knex('dashboard_card_types').insert([])

}
