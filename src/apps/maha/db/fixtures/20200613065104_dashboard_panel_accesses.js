const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('dashboard_panel_accesses').del()

  await knex('dashboard_panel_accesses').insert([])

}
