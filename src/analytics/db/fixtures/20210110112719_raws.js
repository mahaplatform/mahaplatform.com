const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('raws').del()

  await knex('raws').insert([])

}
