const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('labels').del()

  await knex('labels').insert([])

}
