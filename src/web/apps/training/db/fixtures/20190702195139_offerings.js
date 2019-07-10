const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('offerings').del()

  await knex('offerings').insert([])

}
