const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('mediums').del()

  await knex('mediums').insert([])

}
