const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('enrollment_recordings').del()

  await knex('enrollment_recordings').insert([])

}
