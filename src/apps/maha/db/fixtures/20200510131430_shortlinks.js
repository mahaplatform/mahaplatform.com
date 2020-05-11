const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('shortlinks').del()

  await knex('shortlinks').insert([])

}
