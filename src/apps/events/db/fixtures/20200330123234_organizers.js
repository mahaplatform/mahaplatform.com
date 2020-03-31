const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('organizers').del()

  await knex('organizers').insert([])

}
