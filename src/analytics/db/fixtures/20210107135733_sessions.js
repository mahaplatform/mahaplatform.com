const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('sessions').del()

  await knex('sessions').insert([])

}
