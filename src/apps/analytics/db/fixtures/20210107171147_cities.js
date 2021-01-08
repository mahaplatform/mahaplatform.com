const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('cities').del()

  await knex('cities').insert([])

}
