const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('ipaddresses').del()

  await knex('ipaddresses').insert([])

}
