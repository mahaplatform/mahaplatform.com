const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('coupons').del()

  await knex('coupons').insert([])

}
