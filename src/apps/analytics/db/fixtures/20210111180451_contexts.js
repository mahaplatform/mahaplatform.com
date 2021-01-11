const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('contexts').del()

  await knex('contexts').insert([])

}
