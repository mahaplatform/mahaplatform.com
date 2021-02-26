const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('dataset_accesses').del()

  await knex('dataset_accesses').insert([])

}
