const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('signins').del()

  await knex('signins').insert([])

}
