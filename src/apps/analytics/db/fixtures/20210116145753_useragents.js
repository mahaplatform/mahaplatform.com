const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('useragents').del()

  await knex('useragents').insert([])

}
