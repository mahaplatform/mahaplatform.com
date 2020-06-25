const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('media').del()

  await knex('media').insert([])

}
