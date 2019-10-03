const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('responsibilities').del()

  await knex('responsibilities').insert([])

}
