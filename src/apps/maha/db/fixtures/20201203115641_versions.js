const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('versions').del()

  await knex('versions').insert([])

}
