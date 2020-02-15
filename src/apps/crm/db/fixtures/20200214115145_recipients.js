const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('recipients').del()

  await knex('recipients').insert([])

}
