const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('answerings').del()

  await knex('answerings').insert([])

}
