const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('maha_groupings').del()

  await knex('maha_groupings').insert([])

}
