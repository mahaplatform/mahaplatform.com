const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('photos').del()

  await knex('photos').insert([])

}
