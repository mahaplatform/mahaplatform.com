const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('workflows').del()

  await knex('workflows').insert([])

}
