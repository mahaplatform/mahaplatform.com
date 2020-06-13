const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('dashboard_panels').del()

  await knex('dashboard_panels').insert([])

}
