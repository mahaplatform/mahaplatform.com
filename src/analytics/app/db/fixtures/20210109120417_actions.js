const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('actions').del()

  await knex('actions').insert([])

}
