const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('help_articles').del()

  await knex('help_articles').insert([])

}
