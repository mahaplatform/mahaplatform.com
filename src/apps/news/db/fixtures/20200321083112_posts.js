const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('posts').del()

  await knex('posts').insert([])

}
