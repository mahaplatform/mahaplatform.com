const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('apikeys').del()

  await knex('apikeys').insert([])

}
