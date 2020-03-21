const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('likes').del()

  await knex('likes').insert([])

}
