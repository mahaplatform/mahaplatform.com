const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('inventories').del()

  await knex('inventories').insert([])

}
