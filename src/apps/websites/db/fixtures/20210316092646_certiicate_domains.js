const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('certiicate_domains').del()

  await knex('certiicate_domains').insert([])

}
