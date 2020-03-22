const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('members').del()

  await knex('members').insert([])

}
